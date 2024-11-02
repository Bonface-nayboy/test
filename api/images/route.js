import clientpromise from '@/lib/mongodb';

export async function POST(request) {
    try {
        const client = clientpromise();
        const db = client.db('oppo')
        const body = await request.json();
        const { product_name, uri } = body

        const result = await db.collection('images').insertOne();

        return new Response(JSON.stringify, (result.ops[0]), {
            status: 201,
            header: {
                'content-type': 'application/json'
            }
        })

    } catch (err) {
        console.error('error adding the product');
        return new Response('Internal Server Error', {
            status: 500
        })
    }
}


export async function GET(request) {
    try {
        const client = clientpromise();
        const db = client.db('oppo');
        const images = await db.collection('images').find({}).toArray();

        return new Response(JSON.stringify(images), {
            status: 200,
            Headers: {
                'content-type': ' application/json'
            }
        })
    } catch (err) {
        console.error('error adding items to the database', err);
        return new Response('Internal Server Error', {
            status: 500,
        })
    }

}