import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import pool from '../../../lib/db';

//? function to check whether logged in user is admin or not
async function isAdmin(email) {
    try{
        const result = await pool.query(
            "select * from members where email = $1",
            [email]
        );
        return result.rows[0]?.role == 'admin';
    }catch(rr){
        console.log(err);
        return false;
    }
}

//? function to get all members (only admin can access)
export async function GET(req) {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    // checking if user exists or not
    if (!email || !(await isAdmin(email))) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }
    try {
        const result = await pool.query('SELECT * FROM members order by joined_date desc');
        return NextResponse.json(result.rows, { status: 200 });
    }catch {
        console.log(err);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}