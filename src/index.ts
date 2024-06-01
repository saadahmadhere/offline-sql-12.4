import { Client } from 'pg';

const client = new Client({
	connectionString:
		'postgres://postgres:mysecretpassword@localhost:5432/postgres',
});

async function createUsersTable(): Promise<void> {
	await client.connect();
	const result = await client.query(`
    CREATE TABLE users2(
      id SERIAL PRIMARY KEY,
      username VARCHAR(48) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
	console.log(result);
}

async function insertUserData(
	username: string,
	password: string,
	email: string
) {
	await client.connect();
	const result = await client.query(`
    INSERT INTO users (username, password, email) 
    VALUES ('${username}', '${password}', '${email}')
  `);
	console.log(result);
}

async function getAllUsersData() {
	await client.connect();
	const result = await client.query(`
    SELECT * FROM users
  `);

	console.log(result);
}

// createUsersTable();
// insertUserData('saad2', '123', 'saad2@test.com');
getAllUsersData();
