import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TextInput, Text, Alert, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function SubBranch() {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [subBranchCreated, setSubBranchCreated] = useState(false);
    const [subBranches, setSubBranches] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [isNextDisabled, setIsNextDisabled] = useState(false);
    const navigation = useNavigation();
    const scrollViewRef = useRef(null);

    const MAX_BRANCHES = 5;


    // useEffect(() => {
    // axios.get("http://192.168.100.45:8080/api/v1/mainbranch/single")
    //     .then(response => {
    //         setMainBranch(response.data);
    //     })
    //     .catch(error => {
    //         console.error("Error fetching main branch:", error);
    //     });

    // useEffect(() => {
    //     axios.get("http://192.168.100.45:8080/api/v1/subbranch")
    //         .then(response => {
    //             setSubBranches(response.data);
    //         })
    //         .catch(error => {
    //             console.error("Error fetching sub-branches:", error);
    //         });
    // }, []);

    const handleSave = () => {
        const trimmedName = name.trim();
        const trimmedLocation = location.trim();
    
        if (!trimmedName || !trimmedLocation) {
            Alert.alert("Error", "Please enter a valid branch name and location.");
            return;
        }
    
        const branchData = { name: trimmedName, location: trimmedLocation };
    
        if (editingIndex !== null) {
            const branchId = subBranches[editingIndex]?.id; 
            
            if (!branchId) {
                console.error("Error: branchId is undefined");
                return;
            }
            
            axios.put(`https://backend-rees-realme.onrender.com/api/v1/subbranch/single/${branchId}`, {
                name,
                location
            })
            .then(response => {
                const updatedBranches = [...subBranches];
                updatedBranches[editingIndex] = { ...response.data };
                setSubBranches(updatedBranches);
                setEditingIndex(null);
                setShowForm(false); // ✅ Close the form after editing
            })
            .catch(error => console.error("Error updating branch:", error.response?.data || error.message));
        } else {
            if (subBranches.length >= MAX_BRANCHES) {
                Alert.alert("Limit Reached", `You can only create up to ${MAX_BRANCHES} sub-branches.`);
                return;
            }
            axios.post("https://backend-rees-realme.onrender.com/api/v1/subbranch/single", branchData)
                .then(response => {
                    setSubBranches([...subBranches, response.data]);
                    setShowForm(false);
                })
                .catch(error => console.error("Error saving branch:", error));
        }
    
        setName("");
        setLocation("");
        setIsNextDisabled(false);
    };
    
    const handleDelete = (id) => {
        Alert.alert("Confirm Delete", "Are you sure you want to delete this branch?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete", onPress: () => {
                    axios.delete(`https://backend-rees-realme.onrender.com/api/v1/subbranch/single/${id}`)
                        .then(() => {
                            setSubBranches(subBranches.filter(branch => branch.id !== id));  // Ensure you're using "id"
                        })
                        .catch(error => {
                            console.error("Error deleting branch:", error);
                            Alert.alert("Delete Failed", "Failed to delete the branch. Please try again.");
                        });
                }
            }
        ]);
    };
    

    const handleEdit = (index) => {
        setEditingIndex(index);
        setName(subBranches[index].name);
        setLocation(subBranches[index].location);
        setShowForm(true);
        setIsNextDisabled(true);

        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 300);
    };

    const confNext = () => {
        if (subBranches.length > 0) {
            navigation.navigate("Login");
        } else {
            Alert.alert(
                "Create Sub-Branch",
                "Do you want to create a sub-branch?",
                [
                    { text: "No", onPress: () => navigation.navigate("Login") },
                    {
                        text: "Yes",
                        onPress: () => {
                            setShowForm(true);
                            setIsNextDisabled(true);
                        }
                    }
                ]
            );
        }
    };
    return (
        <View style={styles.container}>
            <Button mode="outlined" onPress={() => navigation.navigate('Login')} style={styles.skipButton}>
                Skip
            </Button>

            <Text style={styles.text}>Set Up Branches</Text>

            <Button
                mode="contained"
                onPress={() => { setShowForm(true); setIsNextDisabled(true); }}
                style={styles.createButton}
                disabled={subBranches.length >= MAX_BRANCHES}
            >
                Create Sub Branch
            </Button>

            <ScrollView ref={scrollViewRef} contentContainerStyle={styles.content}>
                <Card style={styles.card}>
                    <View style={styles.branchHeader}>
                        <Text style={styles.branchText}>Main Branch</Text>
                        <Icon name="edit" color="blue" size={24} />
                    </View>
                </Card>

                {subBranches.map((branch, index) => (
                    <Card key={index} style={styles.card}>
                        <View style={styles.branchHeader}>
                            <Text style={styles.branchText}>{branch.name} ({branch.location})</Text>
                            <Icon name="edit" color="blue" size={24} onPress={() => handleEdit(index)} />
                            <Icon name="delete" color="red" size={24} onPress={() => handleDelete(branch.id)} />
                            </View>
                    </Card>
                ))}

                {showForm && (
                    <Card style={styles.formCard}>
                        <View style={styles.form}>
                            <Text>Branch Name</Text>
                            <TextInput
                                value={name}
                                placeholder="Enter branch name"
                                onChangeText={(text) => setName(text)}
                                style={[
                                    styles.input,
                                    name ? styles.filledInput : styles.emptyInput
                                ]}
                            />
                            <Text>Location</Text>
                            <TextInput
                                value={location}
                                placeholder="Enter location"
                                onChangeText={(text) => setLocation(text)}
                                style={[
                                    styles.input,
                                    location ? styles.filledInput : styles.emptyInput
                                ]}
                            />
                        </View>

                        <Button
                            mode="contained"
                            onPress={handleSave}
                            style={styles.Button}
                            disabled={!name.trim() || !location.trim()}
                        >
                            {editingIndex !== null ? "Update" : "Save"}
                        </Button>
                    </Card>
                )}
            </ScrollView>

            {!isNextDisabled && (
                <View style={styles.footer}>
                    <Button mode="contained" onPress={() => confNext()} style={styles.nextButton}>
                        Next
                    </Button>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    text: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 10,
    },
    content: {
        flexGrow: 1,
        paddingBottom: 80,
    },
    card: {
        padding: 16,
        marginVertical: 10,
        backgroundColor: 'white',
    },
    branchHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5,
    },
    branchText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    formCard: {
        padding: 10,
        backgroundColor: 'white',
    },
    form: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        fontSize: 14,
        backgroundColor: 'white',
        color: "black"
    },
    filledInput: {
        backgroundColor: "white",
    },
    emptyInput: {
        backgroundColor: "white",
    },
    Button: {
        marginTop: 10,
        backgroundColor: "green",
        paddingVertical: 5,
        width: 150,
        alignSelf: "center",
        color: "white"
    },
    createButton: {
        backgroundColor: "green",
        paddingVertical: 5,
        width: 250,
        alignSelf: "center",
    },
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
        backgroundColor: "white",
        alignItems: "center",
        borderTopWidth: 1,
        borderColor: "#ccc",
    },
    nextButton: {
        backgroundColor: "green",
        paddingVertical: 10,
        width: "50%",
        alignSelf: "center",
    },
    skipButton: {
        position: "absolute",
        top: 3,
        right: 10,
        backgroundColor: "white",
    },
});
