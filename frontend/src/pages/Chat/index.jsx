import classnames from 'classnames';
import { isEmpty, map } from 'lodash';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Button,
	Card,
	CardBody,
	Col,
	Container,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Input,
	Nav,
	NavItem,
	NavLink,
	Row,
	TabContent,
	TabPane,
	UncontrolledDropdown,
	UncontrolledTooltip
} from 'reactstrap';
import SimpleBar from 'simplebar-react';

//Import Icons
import PersonalInfo from './PersonalInfo';

//redux
import { useDispatch, useSelector } from 'react-redux';

import userDummayImage from '@/assets/images/users/user-dummy-img.jpg';

//Import Scrollbar
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { createSelector } from 'reselect';
import { setReduxRoomId, setRoomData } from '../../slices/store/chatSlice';
import { toast } from 'react-toastify';

import io from 'socket.io-client';

import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { SocketContext } from '../../App';
import { convertToTimeFormat } from '../../helpers/utils';
import { getFromServer } from '../../helpers/requests';

const Chat = () => {
	const { socket, socketHandler } = useContext(SocketContext);
	const [customActiveTab, setcustomActiveTab] = useState('1');
	const toggleCustom = (tab) => {
		if (customActiveTab !== tab) {
			setcustomActiveTab(tab);
		}
	};

	const dispatch = useDispatch();
	const rooms = useSelector((state) => state.ChatRoom);
	console.log('redux rooms', rooms);
	const user = useSelector((state) => state.user);
	const user_id = user?.data?._id;
  console.log('user', user)

	const [isInfoDetails, setIsInfoDetails] = useState(false);
	const [Chat_Box_Username, setChat_Box_Username] = useState('');
	const [Chat_Box_Image, setChat_Box_Image] = useState();
	const [curMessage, setcurMessage] = useState('');
	const [messageBox, setMessageBox] = useState(null);
	const [reply, setreply] = useState('');

	const selectLayoutState = (state) => state.Chat;
	const chatProperties = createSelector(selectLayoutState, (state) => ({
		chats: state.chats,
		messages: state.messages,
		channels: state.channels
	}));

	const [arrivalMesasges, setArrivalMessages] = useState(null);

	// Inside your component
	// const { chats, messages } = useSelector(chatProperties);

	const [messages, setMessages] = useState([]);
	const [roomId, setRoomId] = useState(null); // You can set this based on user's selection or other criteria.

	useEffect(() => {
		if (!socket) {
			const newSocket = io(import.meta.env.VITE_API_URL); // Replace with your server's address
			socketHandler(newSocket);
		}

		if (socket) {
			console.log('socket completed')
			socket.on('receiveMessage', (msg) => {
				console.log('reievde', msg, messages, rooms.roomId, msg.room);
				setArrivalMessages(msg);
			});

			socket.on('error', (errorMessage) => {
				console.error(errorMessage);
			});

			socket.on('success', (successMessage) => {
				console.log('socket connected', successMessage);
			});
		}
	}, [socket]);

	useEffect(() => {
		if (arrivalMesasges) {
			if (arrivalMesasges.room == rooms.roomId) {
				setMessages((prevMessages) => [...prevMessages, arrivalMesasges]);
			}
		}
	}, [arrivalMesasges]);

	const joinRoom = async () => {
		if (socket && rooms.roomId) {
			await socket.emit('joinRoom', { roomId: rooms.roomId });
			console.log('joined chat', rooms.roomId);
		}
	};

	useEffect(() => {
		joinRoom();
	}, [rooms.roomId]);

	const handleSendMessage = () => {
		console.log('first')
		if (socket && rooms.roomId && curMessage) {
			console.log('first2')
			socket.emit('sendMessage', {
				roomId: rooms.roomId,
				sender: user_id, // Replace with user's unique ID or name
				content: curMessage
			});
			console.log('cocked called');
			setcurMessage(''); // Clear input field
		}
	};


	useEffect(() => {
		const fetchData = async () => {
			const result = await getFromServer('rooms');
			if (result.status) {
				dispatch(setRoomData(result.data));
				if (result?.data?.length > 0) {
					const part = result?.data[0]?.participants?.filter((p) => p.isSender == false);
					if (part.length > 0) {
						userChatOpen(part[0]._id, part[0]?.firstName + ' ' + part[0]?.lastName, '', result?.data[0]?._id, part[0]?.profileImageUrl);
					}
				}
			} else {
				toast.error(result.error || result.message);
			}
			console.log('rooms', result);
		};
		fetchData();

		// if ((messages || []).length > 1) {
		//   scrollToBottom();
		// }
	}, []);
	// }, [dispatch, rooms.roomId]);

	//Use For Chat Box
	const userChatOpen = async (id, name, status, roomId, image) => {
		console.log(roomId);
		setChat_Box_Username(name);
		dispatch(setReduxRoomId(roomId));
		// currentRoomId(roomId);
		setChat_Box_Image(image);
		// now get messages
		const result = await getFromServer(`chats/${id}`);
		console.log('messages: ', result);
		setMessages(result.data?.messages || []);
	};

	const scrollToBottom = useCallback(() => {
		if (messageBox) {
			messageBox.scrollTop = messageBox.scrollHeight + 1000;
		}
	}, [messageBox]);

	useEffect(() => {
		if (!isEmpty(messages)) scrollToBottom();
	}, [messages, scrollToBottom]);

	const onKeyPress = (e) => {
		const { key, value } = e;
		// if (key === "Enter") {
		//   e.preventDefault();
		//   setcurMessage(value);
		//   addMessage(rooms.roomId, currentUser.name);
		// }
	};

	//serach recent user
	const searchUsers = () => {
		var input, filter, li, a, i, txtValue;
		input = document.getElementById('search-user');
		filter = input.value.toUpperCase();
		var userList = document.getElementsByClassName('users-list');
		Array.prototype.forEach.call(userList, function (el) {
			li = el.getElementsByTagName('li');
			for (i = 0; i < li.length; i++) {
				a = li[i].getElementsByTagName('a')[0];
				txtValue = a.textContent || a.innerText;
				if (txtValue.toUpperCase().indexOf(filter) > -1) {
					li[i].style.display = '';
				} else {
					li[i].style.display = 'none';
				}
			}
		});
	};

	//Search Message
	const searchMessages = () => {
		var searchInput, searchFilter, searchUL, searchLI, a, txtValue;
		searchInput = document.getElementById('searchMessage');
		searchFilter = searchInput.value.toUpperCase();
		searchUL = document.getElementById('users-conversation');
		searchLI = searchUL.getElementsByTagName('li');
		Array.prototype.forEach.call(searchLI, function (search) {
			a = search.getElementsByTagName('p')[0] ? search.getElementsByTagName('p')[0] : '';
			txtValue = a.textContent || a.innerText ? a.textContent || a.innerText : '';
			if (txtValue.toUpperCase().indexOf(searchFilter) > -1) {
				search.style.display = '';
			} else {
				search.style.display = 'none';
			}
		});
	};

	// Copy Message
	const handleCkick = (ele) => {
		var copy = ele.closest('.chat-list').querySelector('.ctext-content').innerHTML;
		navigator.clipboard.writeText(copy);

		document.getElementById('copyClipBoard').style.display = 'block';
		setTimeout(() => {
			document.getElementById('copyClipBoard').style.display = 'none';
		}, 2000);
	};

	// emoji
	const [emojiArray, setemojiArray] = useState('');

	const onEmojiClick = (event, emojiObject) => {
		setemojiArray([...emojiArray, emojiObject.emoji]);
		let emoji = [...emojiArray, emojiObject.emoji].join(' ');
		setcurMessage(curMessage + event.emoji);
	};

	document.title = 'Chat | 360HR';

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<div className="chat-wrapper row mx-n4 mt-n4 p-1">
						<div className="chat-leftsidebar col-md-4" style={{ minWidth: 'auto', maxWidth: 'auto' }}>
							<div className="px-4 pt-4 mb-4">
								<div className="d-flex align-items-start">
									<div className="flex-grow-1">
										<h5 className="mb-4">{t('Chats')}</h5>
									</div>
								</div>
								<div className="search-box">
									<input onKeyUp={searchUsers} id="search-user" type="text" className="form-control bg-light border-light" placeholder={t('Search here...')} />
									<i className="ri-search-2-line search-icon"></i>
								</div>
							</div>

							<SimpleBar className="chat-room-list pt-3">
								<div className="d-flex align-items-center px-4 mb-2">
									<div className="flex-grow-1">
										<h4 className="mb-0 fs-11 text-muted text-uppercase">{t('Direct Messages')}</h4>
									</div>
								</div>

								<div className="chat-message-list">
									<ul className="list-unstyled chat-list chat-user-list users-list" id="userList">
										{rooms?.rooms?.map((chat, key) => {
											return (
												<>
													{chat?.participants?.map((p) => {
														return (
															<>
																{!p?.isSender && (
																	<li key={key} className={rooms.roomId === chat._id ? 'active' : ''}>
																		<Link
																			to="#"
																			onClick={(e) => {
																				userChatOpen(p?._id, p?.firstName + ' ' + p?.lastName, '', chat?._id, p?.profileImageUrl);
																			}}
																		>
																			<div className="d-flex align-items-center">
																				<div className="flex-shrink-0 chat-user-img online align-self-center me-2 ms-0">
																					<div className="avatar-xxs">
																						{p?.profileImageUrl ? (
																							<img src={p?.profileImageUrl} className="rounded-circle img-fluid userprofile" alt="" />
																						) : (
																							<div className={'avatar-title rounded-circle bg-primary-subtle userprofile'}>
																								{p?.firstName?.charAt(0)} {p?.lastName?.charAt(0)}
																							</div>
																						)}
																					</div>
																					{/* <span className="user-status"></span> */}
																				</div>
																				<div className="flex-grow-1 overflow-hidden">
																					<p className="text-truncate mb-0">
																						{p?.firstName} {p?.lastName}
																					</p>
																				</div>
																				{/* {chat.badge && (
                                      <div className="flex-shrink-0">
                                        <span className="badge bg-dark-subtle text-body rounded p-1">
                                          {chat?.badge}
                                        </span>
                                      </div>
                                    )} */}
																			</div>
																		</Link>
																	</li>
																)}
															</>
														);
													})}
												</>
											);
										})}
										{rooms?.rooms?.length <= 0 ? <div className="text-center mt-3">{t('No chat found')}</div> : ''}
									</ul>
								</div>
							</SimpleBar>
						</div>

						<div className="col-xxl-9 col-md-8 overflow-hidden mt-lg-0 mt-5">
							<div className="chat-content d-lg-flex">
								<div className="w-100 overflow-hidden position-relative">
									<div className="position-relative">
										<div className="p-3 user-chat-topbar ">
											<Row className="align-items-center">
												<Col sm={4} xs={8}>
													<div className="d-flex align-items-center">
														<div className="flex-shrink-0 d-block d-lg-none me-3">
															<div className="user-chat-remove fs-18 p-1">
																<i className="ri-arrow-left-s-line align-bottom"></i>
															</div>
														</div>
														<div className="flex-grow-1 overflow-hidden">
															<div className="d-flex align-items-center">
																<div className="flex-shrink-0 chat-user-img avatar-xs online user-own-img align-self-center me-3 ms-0">
																	{Chat_Box_Image === undefined ? (
																		<img src={userDummayImage} className="rounded-circle img-fluid" alt="" />
																	) : (
																		<img src={Chat_Box_Image} className="rounded-circle img-fluid" alt="" />
																	)}
																	{/* <span className="user-status"></span> */}
																</div>
																<div className="flex-grow-1 overflow-hidden">
																	<h5 className="text-truncate mb-0 fs-16">
																		<div className="text-reset username" data-bs-toggle="offcanvas">
																			{Chat_Box_Username}
																		</div>
																	</h5>
																	{/* <p className="text-truncate text-muted fs-14 mb-0 userStatus">
                                    <small>Online</small>
                                  </p> */}
																</div>
															</div>
														</div>
													</div>
												</Col>
												{/* <Col sm={8} xs={4}>
                          <ul className="list-inline user-chat-nav text-end mb-0">
                            <li className="list-inline-item m-0">
                              <Dropdown
                                isOpen={search_Menu}
                                toggle={toggleSearch}
                              >
                                <DropdownToggle
                                  className="btn btn-ghost-secondary btn-icon shadow-none"
                                  tag="button"
                                >
                                  <FeatherIcon
                                    icon="search"
                                    className="icon-sm"
                                  />
                                </DropdownToggle>
                                <DropdownMenu className="p-0 dropdown-menu-end dropdown-menu-lg">
                                  <div className="p-2">
                                    <div className="search-box">
                                      <Input
                                        onKeyUp={searchMessages}
                                        type="text"
                                        className="form-control bg-light border-light"
                                        placeholder="Search here..."
                                        id="searchMessage"
                                      />
                                      <i className="ri-search-2-line search-icon"></i>
                                    </div>
                                  </div>
                                </DropdownMenu>
                              </Dropdown>
                            </li>

                            <li className="list-inline-item d-none d-lg-inline-block m-0">
                              <button
                                type="button"
                                className="btn btn-ghost-secondary btn-icon shadow-none"
                                onClick={toggleInfo}
                              >
                                <FeatherIcon icon="info" className="icon-sm" />
                              </button>
                            </li>

                            <li className="list-inline-item m-0">
                              <Dropdown
                                isOpen={settings_Menu}
                                toggle={toggleSettings}
                              >
                                <DropdownToggle
                                  className="btn btn-ghost-secondary btn-icon shadow-none"
                                  tag="button"
                                >
                                  <FeatherIcon
                                    icon="more-vertical"
                                    className="icon-sm"
                                  />
                                </DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem
                                    href="#"
                                    className="d-block d-lg-none user-profile-show"
                                  >
                                    <i className="ri-user-2-fill align-bottom text-muted me-2"></i>{" "}
                                    View Profile
                                  </DropdownItem>
                                  <DropdownItem href="#">
                                    <i className="ri-inbox-archive-line align-bottom text-muted me-2"></i>{" "}
                                    Archive
                                  </DropdownItem>
                                  <DropdownItem href="#">
                                    <i className="ri-mic-off-line align-bottom text-muted me-2"></i>{" "}
                                    Muted
                                  </DropdownItem>
                                  <DropdownItem href="#">
                                    {" "}
                                    <i className="ri-delete-bin-5-line align-bottom text-muted me-2"></i>{" "}
                                    Delete
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </li>
                          </ul>
                        </Col> */}
											</Row>
										</div>

										<div className="position-relative" id="users-chat">
											<div className="chat-conversation p-3 p-lg-4" id="chat-conversation">
												<PerfectScrollbar containerRef={(ref) => setMessageBox(ref)}>
													<div id="elmLoader"></div>
													<ul className="list-unstyled chat-conversation-list" id="users-conversation">
														{messages &&
															map(messages, (message, key) => (
																<li className={message.sender === user_id ? 'chat-list right' : ' chat-list left'} key={key}>
																	<div className="conversation-list">
																		<div className="user-chat-content">
																			<div className="ctext-wrap">
																				<div className="ctext-wrap-content">
																					<p className="mb-0 ctext-content">{message.content}</p>
																				</div>
																			</div>
																			<div className="conversation-name">
																				<small className="text-muted time">{convertToTimeFormat(message?.createdAt)}</small>{' '}
																			</div>
																		</div>
																	</div>
																</li>
															))}
													</ul>
												</PerfectScrollbar>
											</div>
											{/* <div
                        className="alert alert-warning alert-dismissible copyclipboard-alert px-4 fade show "
                        id="copyClipBoard"
                        role="alert"
                      >
                        Message copied
                      </div>
                      {emojiPicker && (
                        <div className="alert pickerEmoji">
                          <Picker
                            disableSearchBar={true}
                            onEmojiClick={onEmojiClick}
                          />
                        </div>
                      )} */}
										</div>

										<div className="chat-input-section p-3 p-lg-4">
											<form
												id="chatinput-form"
												onSubmit={(e) => {
													e.preventDefault();
													handleSendMessage();
												}}
											>
												<Row className="g-0 align-items-center">
													<div className="col">
														<div className="chat-input-feedback">Please Enter a Message</div>
														<input
															type="text"
															value={curMessage}
															onChange={(e) => setcurMessage(e.target.value)}
															className="form-control chat-input bg-light border-light"
															id="chat-input"
															placeholder="Type your message..."
															disabled={rooms?.rooms?.length <= 0 ? true : false}
														/>
													</div>
													<div className="col-auto">
														<div className="chat-input-links ms-2">
															<div className="links-list-item">
																<Button type="submit" color="success" className="chat-send waves-effect waves-light" disabled={rooms?.rooms?.length <= 0 ? true : false}>
																	<i className="ri-send-plane-2-fill align-bottom"></i>
																</Button>
															</div>
														</div>
													</div>
												</Row>
											</form>
										</div>

										<div className={reply ? 'replyCard show' : 'replyCard'}>
											<Card className="mb-0">
												<CardBody className="py-3">
													<div className="replymessage-block mb-0 d-flex align-items-start">
														<div className="flex-grow-1">
															<h5 className="conversation-name">{reply && reply.sender}</h5>
															<p className="mb-0">{reply && reply.message}</p>
														</div>
														<div className="flex-shrink-0">
															<button type="button" id="close_toggle" className="btn btn-sm btn-link mt-n2 me-n3 fs-18" onClick={() => setreply('')}>
																<i className="bx bx-x align-middle"></i>
															</button>
														</div>
													</div>
												</CardBody>
											</Card>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Container>
			</div>

			<PersonalInfo show={isInfoDetails} onCloseClick={() => setIsInfoDetails(false)} currentuser={Chat_Box_Username} cuurentiseImg={Chat_Box_Image} />
		</React.Fragment>
	);
};

export default Chat;
