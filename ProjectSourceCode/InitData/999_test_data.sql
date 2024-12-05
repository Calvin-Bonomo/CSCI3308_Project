INSERT INTO users (
	username, 
	password,
	description, 
	image_url
) VALUES (
	'Technostalgic',
	'$2a$10$yPd6rqLe1z2l/59fAIEAFe4h8E3mOinYnJVLZHm3nm20/pFVVup/q',
	'Big ol'' nerd',
	'https://technostalgic.gitlab.io/portfolio/files/media/avatar.png'
) ON CONFLICT (username) DO NOTHING;

INSERT INTO posts (
	post_id,
	username, 
	company_name, 
	position, 
	link, 
	modality, 
	body, 
	salary, 
	upvotes, downvotes
) VALUES (
	1,
	'Technostalgic', 
	'Laboratory for Atmospheric and Space Physics at CU', 
	'Undergraduate Python Developer',
	'https://lasp.colorado.edu/careers/',
	2,
	'Quick interview process',
	20000,
	0, 0
),(
	2,
	'Technostalgic',
	'National Solar Observatory',
	'Undergraduate Research Assistant',
	'https://nso.edu/about/jobs/',
	0,
	'Pretty ☀ Pics',
	3000,
	0, 0
) ON CONFLICT (post_id) DO NOTHING;