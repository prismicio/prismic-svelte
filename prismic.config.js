const usePrismic = (config) => {
	return {
		log: () => console.log(config),
		string: config,
	};
};

const prismic = usePrismic("dogger");

export default prismic;
