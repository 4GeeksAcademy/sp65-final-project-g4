const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [{title: "FIRST", background: "white", initial: "white"}],
			accessToken: null,
			isLogedIn: false,
			userEmail: "",
			isAdmin: false,
			chats: [],
			chatsWithMessages: [],
			chatId: [],
			currentChat: [],
			users: [],
			students: [],
			landlords: [],
			allMessages: [],
			userName: "",
			userData: {},	
			flats:[],
			flatId: sessionStorage.getItem('flatId') ? sessionStorage.getItem('flatId') : '',
			currentFlat: sessionStorage.getItem('currentFlat') ? sessionStorage.getItem('currentFlat') : '',
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
				console.log(userData)
				const uri = `${process.env.BACKEND_URL}/api/login`;
				console.log(uri)
				const options = {
					method: 'POST',
					headers: {
						'Content-type': 'application/json',
					},
					body: JSON.stringify(userData)
				}
				const response = await fetch(uri, options)
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					return
				}
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
				setStore({ flats: data.results });
			},
			setFlatId: (id) => {
				setStore({ flatId: id })
				sessionStorage.setItem('flatId', id)
			},
			getFlatsId: async () => {
				const url = `${process.env.BACKEND_URL}/api/flats/${getStore().flatId}`;
				const options = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				}
				const response = await fetch(url, options)
				if (!response.ok) {
					console.log("Error");
					return
				}
				const data = await response.json();
				setStore({ currentFlat: data.results });
				sessionStorage.setItem('currentFlat', JSON.stringify(data.results))
			},

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
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
					}
				}

				const response = await fetch(url, options)
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					return
				}
				const data = await response.json();
				setStore({ chats: data.results });
				

		
			},

			getAllMessages: async () => {
				const url = `${process.env.BACKEND_URL}/api/messages`;
				const options = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
					}
				};
			
				const response = await fetch(url, options);
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					return;
				}
				const data = await response.json();
				setStore({ allMessages: data.results });
			},
			
			setChatId: (id) => {
				setStore({ chatId: id });
				sessionStorage.setItem('chatId', id);
			},
			
			getMessagesWithChatId: async () => {
				const chatId = getStore().chatId;
    			const url = `${process.env.BACKEND_URL}/api/messages/${chatId}`;
    			const options = {
        					method: 'GET',
        					headers: {
            					'Content-Type': 'application/json',
            					'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        					}
    		};
			
				const response = await fetch(url, options);
				if (!response.ok) {
					console.log("Error");
					return;
				}
				const data = await response.json();
    			console.log(data);
    			setStore({ currentChat: data.results });
    			sessionStorage.setItem('currentChat', JSON.stringify(data.results));
			},

		}
	};
	};


export default getState;
