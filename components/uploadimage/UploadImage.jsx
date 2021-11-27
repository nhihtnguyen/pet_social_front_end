import { Card, Button, Form } from "react-bootstrap";
import { FiArrowUp, FiX, FiAtSign, FiHash } from "react-icons/fi";
import { FaArrowUp } from 'react-icons/fa';
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import axios from 'axios';
import {
	editPostActions,
	editPostSelector,
} from "../../features/post/editPostSlice";
import { useEffect } from "react";
import Image from 'next/image';

import styles from './UploadImage.module.scss';

const UploadImage = () => {
	const dispatch = useAppDispatch();
	const editPostData = useAppSelector(editPostSelector);

	useEffect(() => { }, []);

	const [image, setImage] = useState("");
	const [file, setFile] = useState('');
	const [caption, setCaption] = useState('');

	const handleChange = (e) => {
		let file = e.target.files[0];
		setFile(file);

		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			setImage(reader.result);
		};
	};
	const handleClose = () => {
		setImage();
	};
	const handleUpload = () => {
		var bodyFormData = new FormData();
		bodyFormData.append('image', file);
		bodyFormData.append('caption', 'hello');
		bodyFormData.append('user_id', 3);
		axios.post('http://localhost:3001/post',
			bodyFormData,
			{ headers: { "Content-Type": "multipart/form-data" } }).then(res => {
				return res.data
			}).catch(err => {
				//
			})
		//dispatch(editPostActions.fetch({ data: bodyFormData }));
	};
	return (
		<Card className={`${styles['create-post-card']} shadow-xss rounded-xxl`}>
			<Card.Body className="d-flex" style={{ margin: 20 }}>
				<div className={`${styles['image-upload']}`}>
					{image && (
						<div className='image-container'>
							<Image
								layout='fill'
								className='image'
								src={image}
								alt="image"
								style={{
									objectFit: "contain",
									height: "100%",
									width: "100%",
								}}
							/>
						</div>
					)}
					{image && <FiX onClick={handleClose} className={`${styles['btn-close']}`} />}
					{!image && (
						<div className={`${styles['browse-file-container']}`}>
							<div className={`${styles['button']} mb-3`} style={{ padding: 8 }}>
								<input type="file" onChange={handleChange} />
								<FaArrowUp className="i-color" />
							</div>
							<h6>Drag and drop or click to upload</h6>
						</div>
					)}
				</div>

				<div
					style={{
						position: 'relative',
						marginLeft: 20,
						width: '100%'
					}}>
					<h3>Tell your story</h3>
					<div className={`rounded-xxl`}
						style={{

							width: '100%',
							position: 'relative',
						}}>
						<Form.Control
							value={caption}
							onChange={(e) => setCaption(e.target.value)}
							as="textarea"
							rows={5}
							style={{
								border: '3px solid #F1F1F1',
								borderWidth: 3,
								borderColor: '#F1F1F1',
								resize: 'none',
								borderBottom: '30px solid #F1F1F1 !important',
							}}
							className={`rounded-xxl`}
						/>

						<div
							style={{
								position: 'absolute',
								width: '100%',
								height: 30,
								left: 0,
								bottom: 0,
								background: '#F1F1F1',
								borderRadius: '0 0 15px 15px',
							}}
							className={`${styles['action-button']}`}
						>
							<FiHash /> Tag
							<FiAtSign /> Mention
						</div>
					</div>
					<Button
						style={{
							position: "absolute",
							bottom: "0",
							padding: "0.5rem 1.5rem",
							fontSize: 14,
							borderRadius: 30,
						}}
						variant="primary"
						size="lg"
						onClick={handleUpload}
					>
						Post
					</Button>{" "}

				</div>
			</Card.Body>
		</Card >
	);

};

export default UploadImage;
