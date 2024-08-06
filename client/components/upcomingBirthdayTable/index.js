import React from 'react'
import { Card, Form, Badge, ListGroup } from 'react-bootstrap'
import styles from './upcomingBirthdayTable.module.css'
import { MdFamilyRestroom } from 'react-icons/md'
import { GiThreeFriends } from 'react-icons/gi'

const UpcomingBirthdayTable = ({ data, range, onSelect }) => {
	return (
		<Card>
			<Card.Header className={styles.tableHeader}>
				<h5>{`Upcoming Birthdays in ${range} days!`}</h5>
				<div className={styles.selectRange}>
					<label>Upcoming Birthdays in</label>
					<Form.Select
						aria-label='Default select example'
						value={range}
						onChange={(e) => onSelect(e.target.value)}
						className={styles.selectForm}
					>
						<option value='7'>1 Week</option>
						<option value='30'>1 Month</option>
						<option value='90'>3 Months</option>
					</Form.Select>
				</div>
			</Card.Header>
			<Card.Body className={styles.cardBody}>
				<ListGroup as='ol' numbered>
					{data.map((birthday) => {
						return (
							<ListGroup.Item
								as='li'
								className='d-flex justify-content-between align-items-start'
								key={birthday.id}
							>
								<div className='ms-2 me-auto'>
									<div className='fw-bold'>{birthday.name}</div>
									{`${birthday.daysUntil} days left.`}
								</div>
								{birthday.category !== null && (
									<Badge bg='primary' pill>
										<div className={styles.categoryBadge}>
											{birthday.category === 'friends' ? (
												<GiThreeFriends />
											) : (
												<MdFamilyRestroom />
											)}
											<span>
												{birthday.category.charAt(0).toUpperCase() +
													birthday.category.slice(1)}
											</span>
										</div>
									</Badge>
								)}
							</ListGroup.Item>
						)
					})}
				</ListGroup>
			</Card.Body>
		</Card>
	)
}

export default UpcomingBirthdayTable
