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
			lastProfilePicUrl: '',
			userData: localStorage.getItem('user') ? localStorage.getItem('user') : '',
			students: [],
			landlords: [],
			/* Chats */
			chats: [],
			chatId: "",
			currentChat: [],
			allMessages: [],
			userName: "",
			/* Flats */
			flats: [],
			flatId: sessionStorage.getItem('flatId') ? sessionStorage.getItem('flatId') : '',
			currentFlat: sessionStorage.getItem('currentFlat') ? JSON.parse(sessionStorage.getItem('currentFlat')) : '',
			editingFlat: {},
			// Images
			albums: [],
			albumId: "",
			newAlbumId: "",
			albumCloudinary: [],
			// Rooms
			rooms: [],
			roomId: [],
			roomId: sessionStorage.getItem('roomId') ? sessionStorage.getItem('roomId') : '',
			currentRoom: sessionStorage.getItem('currentRoom') ? JSON.parse(sessionStorage.getItem('currentRoom')) : '',
			editingRoom: [],
			favorites: sessionStorage.getItem('favorites') ? JSON.parse(sessionStorage.getItem('favorites')) : '',
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
				localStorage.setItem('token', data.access_token)
				localStorage.setItem('user', JSON.stringify(data.data))
			},
			getFavorites: async (studentId) => {
				const uri = `${process.env.BACKEND_URL}/api/favorites`
				const options = {
					method: 'GET'
				}
				const response = await fetch(uri, options);
				const data = await response.json()
				setStore({ favorites: data.results });
				sessionStorage.setItem('favorites', JSON.stringify(data.results))
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
				setStore({ accessToken: userData.access_token })
				userData.is_student ? setStore({ userName: userData.student_name }) : setStore({ userName: userData.landlord_name })
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

			settingLastProfPicUrl: (imageUrl) => {
				setStore({ lastProfilePicUrl: imageUrl })
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

			setRoomId: (id) => {
				setStore({ roomId: id })
				sessionStorage.setItem('roomId', id)
			},

			getRoomId: async () => {
				const url = `${process.env.BACKEND_URL}/api/rooms/${getStore().roomId}`;
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
				setStore({ currentRoom: data.results });
				sessionStorage.setItem('currentRoom', JSON.stringify(data.results))
			},

			createNewRoom: async (dataToSend) => {
				const url = `${process.env.BACKEND_URL}/api/rooms`;
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
				const newRoom = await response.json();
				await getActions().getRooms();
				setStore({ rooms: [...getStore().rooms, newRoom] });;
				setStore({ roomID: newRoom.id });

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

			setNewFlatId: (id) => {
				setStore({ newFlatId: id })
				sessionStorage.setItem('newFlatId', id)
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

			setEditingFlat: (editFlat) => {
				setStore({ editingFlat: editFlat })
			},

			editFlats: async (dataToEdit) => {
				const url = `${process.env.BACKEND_URL}/api/flats/${getStore().currentFlat.id}`;
				const options = {
					method: "PUT",
					body: JSON.stringify(dataToEdit),
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${store.accessToken}`
					}
				};
				
				const response = await fetch(url, options);
				if (!response.ok) {
					console.log("Error updating flat", response.status, response.statusText);
					return;
				}
				const updatedFlat = await response.json();
				setStore({ flats: getStore().flats.map(flat => flat.id === updatedFlat.id ? updatedFlat : flat) });
				console.log("Flat updated successfully");
			},
			
			createAlbum: async (dataToSend) => {
				const url = `${process.env.BACKEND_URL}/api/albums`;
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${getStore().accessToken}`
					},
					body: JSON.stringify(dataToSend),
				};

				
		
				const response = await fetch(url, options);
				if (!response.ok) {
					console.log("Error");
					return;
				}
				const newAlbum = await response.json();
				setStore({ albums: [...getStore().albums, newAlbum], newAlbumId: newAlbum.id });
				
				console.log(newAlbum);
			},
		
			uploadToCloudinary: async (formData) => {
				const url = `${process.env.BACKEND_URL}/api/photoflats/${getStore().currentFlat.id}`;
				const options = {
					method: "POST",
					headers: {
						'Authorization': `Bearer ${getStore().accessToken}`
					},
					body: formData,
				};
				
				const response = await fetch(url, options);
				if (!response.ok) {
					console.log("Error uploading pictures", response.status, response.statusText);
					alert("Lo sentimos. Tus fotos no se han podido subir");
					return;
				}
		
				const newAlbumCloudinary = await response.json();
				setStore({ albumCloudinary: newAlbumCloudinary });
			},

			setAlbumId: (idAlbum) => {
				setStore({ newAlbumId: idAlbum })
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
						'Authorization': `Bearer ${getStore().accessToken}`,
						'mode': 'no-cors'
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
						'Authorization': `Bearer ${getStore().accessToken}`,
						'mode': 'no-cors'
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
				console.log("Setting chat ID:", id);
				setStore({ chatId: id });
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
					console.log("Error Error fetching messages, status:", response.status);
					return;
				}
				const data = await response.json();
				setStore({ currentChat: data.results });
			},

			postNewMessage: async (dataToSend) => {
				const { accessToken, currentChat } = getStore();
				console.log("Posting new message:", dataToSend);
				console.log("Using access token:", accessToken);

				if (!accessToken) {
					console.log("Access token missing");
					return;
				}

				const url = `${process.env.BACKEND_URL}/api/messages`;
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${accessToken}`
					},
					body: JSON.stringify(dataToSend)
				};

				console.log(`Posting new message to ${url}`, dataToSend);
				const response = await fetch(url, options);
				if (!response.ok) {
					console.log("Error posting message, status:", response.status);
					return;
				}
				const newMessage = await response.json();
				setStore({ currentChat: [...currentChat, newMessage.results] });
			},
		

		}
	};
};


export default getState;
