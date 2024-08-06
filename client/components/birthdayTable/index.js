import React, { useState, useRef } from 'react'
import moment from 'moment'
import { Table, Button, Card, Modal, Form } from 'react-bootstrap'
import { MdFamilyRestroom } from 'react-icons/md'
import { GiThreeFriends } from 'react-icons/gi'
import styles from './birthdayTable.module.css'

const BirthdayTable = ({ data, onDelete, onEdit, onCreate, onSearch }) => {
	const [showCreateModal, setShowCreateModal] = useState(false)
	const handleCreateClose = () => setShowCreateModal(false)
	const handleCreateShow = () => setShowCreateModal(true)

	const nameCreateRef = useRef(null)
	const categoryCreateRef = useRef(null)
	const dateCreateRef = useRef(null)

	const searchBarRef = useRef(null)

	const [editModal, setEditModal] = useState({
		show: false,
		id: '',
		name: '',
		category: '',
		date: '',
	})
	const handleEditFormChange = (e) => {
		const { id, value } = e.target
		setEditModal((prevData) => ({
			...prevData,
			[id]: id === 'date' ? `${value}T12:00:00.000Z` : value,
		}))
	}
	const handleEditModalOpen = (item) => {
		setEditModal({
			show: true,
			id: item.id,
			name: item.name,
			category: item.category === null ? '' : item.category,
			date: item.date,
		})
	}
	const handleEditModalClose = () => {
		setEditModal({
			show: false,
			id: '',
			name: '',
			category: '',
			date: '',
		})
	}

	return (
		<>
			{/* create modal */}
			<Modal show={showCreateModal} onHide={handleCreateClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add Birthday</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className='mb-3' controlId='name'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Name'
								ref={nameCreateRef}
							/>
						</Form.Group>

						<Form.Group className='mb-3' controlId='category'>
							<Form.Label>Category</Form.Label>
							<Form.Select
								aria-label='Default select example'
								ref={categoryCreateRef}
							>
								<option value=''></option>
								<option value='family'>Family</option>
								<option value='friends'>Friends</option>
							</Form.Select>
						</Form.Group>

						<Form.Group className='mb-3' controlId='date'>
							<Form.Label>Date</Form.Label>
							<Form.Control
								type='date'
								placeholder='Date'
								max='2023-12-31'
								ref={dateCreateRef}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleCreateClose}>
						Close
					</Button>
					<Button
						variant='primary'
						onClick={() => {
							const nameValue = nameCreateRef.current.value
							const dateValue = dateCreateRef.current.value
							const categoryValue = categoryCreateRef.current.value

							onCreate({
								name: nameValue,
								date: dateValue,
								category: categoryValue,
							})
							handleCreateClose()
						}}
					>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
			{/* edit modal */}
			<Modal show={editModal.show} onHide={handleEditModalClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Birthday</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className='mb-3' controlId='name'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Name'
								value={editModal.name}
								onChange={handleEditFormChange}
							/>
						</Form.Group>

						<Form.Group className='mb-3' controlId='category'>
							<Form.Label>Category</Form.Label>
							<Form.Select
								aria-label='Default select example'
								value={editModal.category}
								onChange={handleEditFormChange}
							>
								<option value=''></option>
								<option value='family'>Family</option>
								<option value='friends'>Friends</option>
							</Form.Select>
						</Form.Group>

						<Form.Group className='mb-3' controlId='date'>
							<Form.Label>Date</Form.Label>
							<Form.Control
								type='date'
								placeholder='Date'
								value={moment(editModal.date).format('YYYY-MM-DD')}
								onChange={handleEditFormChange}
								max='2023-12-31'
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleEditModalClose}>
						Close
					</Button>
					<Button
						variant='primary'
						onClick={() => {
							onEdit({
								id: editModal.id,
								name: editModal.name,
								date: editModal.date,
								category: editModal.category,
							})
							handleEditModalClose()
						}}
					>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>

			<Card>
				<Card.Header className={styles.tableHeader}>
					<h5>Birthday Table</h5>
					<Button variant='success' onClick={handleCreateShow}>
						Add Birthday
					</Button>
				</Card.Header>
				<Card.Body>
					<Form.Control
						type='text'
						placeholder="Search user's birthday"
						className={styles.searchBar}
						ref={searchBarRef}
						onChange={() => onSearch(searchBarRef.current.value)}
					/>
					<Table hover responsive>
						<thead>
							<tr>
								<th className={styles.centerAlign}>Name</th>
								<th className={styles.centerAlign}>Category</th>
								<th className={styles.centerAlign} colSpan={2}>
									Birth_Date
								</th>
								<th className={styles.centerAlign}></th>
							</tr>
						</thead>
						<tbody>
							{data.map((item) => (
								<tr key={item.id}>
									<td>{item.name}</td>
									<td>
										<div className={styles.category}>
											{item.category === 'family' ? (
												<MdFamilyRestroom size={20} />
											) : item.category === 'friends' ? (
												<GiThreeFriends size={20} />
											) : (
												<div>-</div>
											)}
											{item.category !== null && (
												<span>
													{item.category.charAt(0).toUpperCase() +
														item.category.slice(1)}
												</span>
											)}
										</div>
									</td>
									<td>{moment(item.date).format('MMMM D')}</td>
									<td
										className={styles.daysLeft}
									>{`${item.daysUntil} days left`}</td>
									<td>
										<div className={styles.actions}>
											<Button
												variant='danger'
												onClick={() => onDelete(item.id)}
											>
												Delete
											</Button>
											<Button
												variant='warning'
												onClick={() => handleEditModalOpen(item)}
											>
												Edit
											</Button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Card.Body>
			</Card>
		</>
	)
}

export default BirthdayTable
