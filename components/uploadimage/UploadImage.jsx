import { Card, Button } from "react-bootstrap";
import { FiArrowUp, FiX } from "react-icons/fi";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import axios from 'axios';
import {
	editPostActions,
	editPostSelector,
} from "../../features/post/editPostSlice";
import { useEffect } from "react";
import Image from 'next/image';

const UploadImage = () => {
	const dispatch = useAppDispatch();
	const editPostData = useAppSelector(editPostSelector);

	useEffect(() => { }, []);

	const [image, setImage] = useState("");
	const [file, setFile] = useState('');

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
		<div>
			<Card className="w880 ">
				<Card.Body className="d-flex">
					<div className="image-upload ">
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
						{image && (
							<FiX onClick={handleClose} className="btn-close" />
						)}
						{!image && (
							<div className="file-upload ">
								<input type="file" onChange={handleChange} />
								<FiArrowUp className="i-color" />
							</div>
						)}
					</div>
					<div style={{ position: "relative" }}>
						<Button
							style={{
								position: "absolute",
								bottom: "0",
								left: "30px",
								padding: "0 1.5rem",
							}}
							variant="primary"
							size="lg"
							onClick={handleUpload}
						>
							Post
						</Button>{" "}
					</div>
				</Card.Body>
			</Card>
		</div>
	);

};

export default UploadImage;
