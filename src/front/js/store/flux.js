const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [{ title: "FIRST", background: "white", initial: "white" }],
			accessToken: null,
			isLogedIn: false,
			userEmail: "",
			userName: "",
			isAdmin: false,
			chats: [],
			chatsWithMessages: [],
			chatId: [],
			currentChat: [],
			users: [],
			students: [],
			landlords: [],
			userData: localStorage.getItem('user') ? localStorage.getItem('user') : '',	
			allMessages: [],
			userName: "",
			flats: null,
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
				const uri = `${process.env.BACKEND_URL}/api/login`
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
				setStore({ accessToken: access_token })
				setStore({ userEmail: data.data.email })
				setStore({ userName: data.data.name })
				setStore({ userData: data.data })
				setStore({ isLogedIn: true })
				localStorage.setItem('token', JSON.stringify(data.access_token))
				localStorage.setItem('user', JSON.stringify(data.data))
			},

			getStudent: async (studentId) => {
				const uri = `${process.env.BACKEND_URL}/api/students/${studentId}`
				const options = {
					method: 'GET'
				}
				const response = await fetch(uri, options);
				const data = await response.json();


			},

			logedIn: (userData) => {
				setStore({ isLogedIn: true, userEmail: userData.email })
				setStore({ userData: userData.data })
			},

			oldLogin: () => {
				if (localStorage.getItem('token' && 'user')) {
					console.log('Hay usuario logeado:', localStorage.getItem('user'))
					setStore({
						accessToken: localStorage.getItem('token'),
						userData: JSON.parse(localStorage.getItem('user')),
						isLogedIn: true
					})
				} else { console.log('No hay usuario logeado') }
			},

			putStudent: async (studentData, token, id) => {
				const uri = `${process.env.BACKEND_URL}/api/students/${id}`
				const options = {
					method: 'PUT',
					headers: {
						'Content-type': 'application/json',
						/* 'Authorization': 'Bearer ' + token */
					},
					body: JSON.stringify(studentData)
				}
				const response = await fetch(uri, options);
				const data = await response.json();
				setStore({ userData: data.results })
				localStorage.setItem('user', JSON.stringify(data.results))
			},

			userLogout: () => {
				localStorage.removeItem('token')
				localStorage.removeItem('user')
				setStore({
					accessToken: null,
					userData: {},
					isLogedIn: false
				})
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

			getStudents: async () => {
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
    			setStore({ currentChat: data.results });
    			sessionStorage.setItem('currentChat', JSON.stringify(data.results));
			},

			postNewMessage: async (dataToSend) => {
				const url = `${process.env.BACKEND_URL}/api/messages`;
    			const options = {
        					method: 'POST',
        					headers: {
            					'Content-Type': 'application/json',
            					'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        					},
							body: JSON.stringify(dataToSend)
			}

			const response = await fetch(url, options);
				if (!response.ok) {
					console.log("Error");
					return;
				}
				const newMessage = await response.json();
    			setStore({ allMessages: [...store.allMessages, newMessage] });;
				getActions().getMessagesWithChatId();
		}
	}
	};
	};


export default getState;
