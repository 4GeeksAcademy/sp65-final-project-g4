const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			message: null,
			demo: [{title: "FIRST", background: "white", initial: "white"}],
			apiContact: 'https://automatic-rotary-phone-4xvx5gxw67h7p4g-3001.app.github.dev',
			accessToken: null,
			isLogedIn: false,
			userEmail: "",
			isAdmin: false,
			chats: [],
			allChats: [],
			users: [],
			students: [],
			landlords: [],
			currentChat: [],
			currentChatUrl: [],
			userName: "",
			userData: {},	
			flats:[]

		},
		actions: {
			getMessage: async () => {
				const response = await fetch(process.env.BACKEND_URL + "/api/hello")
				if (!response.ok) {
					console.log("Error loading message from backend", response.status, response.statusText)
					return
				}
				const data = await response.json()
				setStore({ message: data.message })
				return data;  // Don't forget to return something, that is how the async resolves
			},
			loginUser: async (userData) => {
				const uri = getStore().apiContact + '/api/login'
				const options = {
					method: 'POST',
					headers: {
						'Content-type': 'application/json',
					},
					body: JSON.stringify(userData)
				}
				const response = await fetch(uri, options);
				const data = await response.json();
				const access_token = data.access_token;
				setStore({accessToken: access_token})
				setStore({userEmail: data.data.email})
				setStore({userName: data.data.name})
				setStore({userData: data.data})
				setStore({isLogedIn: true})
				localStorage.setItem('token', JSON.stringify(data.access_token))
				localStorage.setItem('user', JSON.stringify(data.data))
			
			},
			logedIn: (userData) => {
				setStore({isLogedIn: true, userEmail: userData.email})
				setStore({userData: localStorage.getItem(userData)})
			},

			oldLogin: () => {
				if (localStorage.getItem('token' && 'user')) {
					console.log('Hay usuario logeado:', localStorage.getItem('user'))
					getActions().logedIn(localStorage.getItem('user'))
					setStore({accessToken: localStorage.getItem('token')})
					
				} else {console.log('No hay usuario logeado')}
			},

			userLogout: () => {
				localStorage.removeItem('token')		
				localStorage.removeItem('user')
				setStore({accessToken: null, 
						  userData: {}, 
						  isLogedIn: false})
			},

			getFlats: async () => {
				const url = `${process.env.BACKEND_URL}/api/flats`;
				const options = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				}

				const response = await fetch(url, options)
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					return
				}
				const data = await response.json()
				console.log(data);
				setStore({ flats: data.results });
			},


			/* getChats: async () => {
				const url = `${process.env.BACKEND_URL}/api/chatstudent`;
				const options = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				}

				const response = await fetch(url, options)
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					return
				}
				const data = await response.json()
				setStore({ chats: data.results });

			}, */

			
			getUsers: async () => {
				const url = `${process.env.BACKEND_URL}/api/users`;
				const options = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				}

				const response = await fetch(url, options)
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					return
				}
				const data = await response.json()
				setStore({ users: data.results });

			},

			getLandlords: async () => {
				const url = `${process.env.BACKEND_URL}/api/landlords`;
				const options = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				}

				const response = await fetch(url, options)
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					return
				}
				const data = await response.json()
				setStore({ landlords: data.results });
			},

			getStudents: async () =>{
				const url = `${process.env.BACKEND_URL}/api/students`;
				const options = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				}

				const response = await fetch(url, options)
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					return
				}
				const data = await response.json()
				setStore({ students: data.results });
			},

			getAllChats: async () => {
				const url = `${process.env.BACKEND_URL}/api/chats`;
				const options = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				}

				const response = await fetch(url, options)
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					return
				}
				const data = await response.json()
				setStore({ allChats: data.results });
			},

			settingCurrentChatUrl: (text) => {setStore({currentChatUrl: text})},

			getCurrentChat: async () =>{
				const uri = getStore().currentChatUrl;
				console.log(uri);
				const response = await fetch(uri);
				if (!response.ok) {
					console.log("Error");
					return;
				}
				const data = await response.json();
				console.log(data.result);
				setStore({ currentChat: data.result });

			}
		}
	};
};


export default getState;
