import { Hono } from 'hono';
import { basicAuth } from 'hono/basic-auth';

const app = new Hono();

app.get('/', async c => {
	let data = await c.env.DB.prepare(
		`
	   		SELECT * FROM temperature
	    	ORDER BY unixtime DESC
	    	LIMIT 1
		`
	).all();

	let date = new Date(data.results[0].unixtime);

	return c.text(
		`${date.getHours().toString().padStart(2, '0')}時${date.getMinutes().toString().padStart(2, '0')}分現在の部屋の温度は${
			data.results[0].temperature
		}℃です`
	);
});

app.use('/set', async (c, next) => {
	const auth = basicAuth({
		username: c.env.SECRET_USERNAME,
		password: c.env.SECRET_PASSWORD
	});
	return auth(c, next);
});

app.post('/set', async c => {
	try {
		const formData = await c.req.formData();
		await c.env.DB.prepare(
			`
    			insert into temperature (unixtime, temperature) values (?, ?)
  			`
		)
			.bind(formData.get('unixtime'), formData.get('temperature'))
			.run();
	} catch (e) {
		c.status(500);
		return c.text('SET ERROR');
	}
	return c.text('SET OK');
});

export default app;
