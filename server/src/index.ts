export default {
	async fetch (request: Request, env: Env) {
		const { pathname } = new URL(request.url);
		//TODO 温度セットの記述をする
		//TODO honoにする
		if (pathname === '/') {
			let data = await env.DB.prepare(
				`
       			SELECT * FROM temperature
        		ORDER BY unixtime DESC
        		LIMIT 1
				`
			).all();

			let date = new Date(data.results[0].unixtime * 1000);
			date.setHours(date.getHours() + 9);
			return Response.json(
				`${date.getHours().toString().padStart(2, '0')}時${date.getMinutes().toString().padStart(2, '0')}分現在の部屋の温度は${
					data.results[0].temperature
				}℃です`
			);
		}
	}
};
