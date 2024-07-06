const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [{ title: "FIRST", background: "white", initial: "white" }],
			/* Login and Users */
			accessToken: null,
			isLogedIn: false,
			userEmail: "",
			userName: "",
			isAdmin: false,
			users: [],
			userData: localStorage.getItem('user') ? localStorage.getItem('user') : '',	
			students: [],
			landlords: [],
			/* Chats */
			chats: [],
			chatsWithMessages: [],
			chatId: [],
			currentChat: [],
			allMessages: [],
			userName: "",
			/* Flats */
			rooms: [],
			flats: [],
			flatId: sessionStorage.getItem('flatId') ? sessionStorage.getItem('flatId') : '',
			currentFlat: sessionStorage.getItem('currentFlat') ? sessionStorage.getItem('currentFlat') : null,
			albums: [],
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
				console.log(data.access_token)
				localStorage.setItem('token', data.access_token)
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

			putLandlord: async (landlordData, token, id) => {
				const uri = `${process.env.BACKEND_URL}/api/landlords/${id}`
				const options = {
					method: 'PUT',
					headers: {
						'Content-type': 'application/json',
						/* 'Authorization': 'Bearer ' + token */
					},
					body: JSON.stringify(landlordData)
				}
				const response = await fetch(uri, options);
				const data = await response.json();
				console.log(data);
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

			getUniversities: async () => {
				const url = `${process.env.BACKEND_URL}/api/universities`;
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
				setStore({ universities: data.results });
			},
			getRooms: async () => {
				const url = `${process.env.BACKEND_URL}/api/rooms`;
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
				setStore({ rooms: data.results });
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

			createNewFlat: async (dataToSend) => {
				const url = `${process.env.BACKEND_URL}/api/flats`;
    			const options = {
        					method: 'POST',
        					headers: {
            					'Content-Type': 'application/json',
            					'Authorization': `Bearer ${getStore().accessToken}`
        					},
							body: JSON.stringify(dataToSend)
			}

			const response = await fetch(url, options);
				if (!response.ok) {
					console.log("Error");
					return;
				}
				const newFlat = await response.json();
				await getActions().getFlats(); 
    			setStore({ flats: [...getStore().flats, newFlat] });;

			},

			createAlbum: async (dataToSend) => {
				const url = `${process.env.BACKEND_URL}/api/albums`;
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
				const newAlbum = await response.json();
				await getActions().getFlats(); 
    			setStore({ albums: [...store.albums, newAlbum] });;
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
						'Authorization': `Bearer ${getStore().accessToken}`
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
						'Authorization': `Bearer ${getStore().accessToken}`
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
            					'Authorization': `Bearer ${getStore().accessToken}`
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
            					'Authorization': `Bearer ${getStore().accessToken}`
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
