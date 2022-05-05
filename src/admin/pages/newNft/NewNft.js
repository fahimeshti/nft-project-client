import './NewNft.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Row, Col, Button, FloatingLabel } from 'react-bootstrap';
import { useState } from 'react';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
import app from "../../../firebase";
import { addProduct } from "../../../redux/apiCalls";
import { useDispatch } from "react-redux";

const NewNft = () => {
    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState([]);
    const dispatch = useDispatch();

const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };
  const handleClick = (e) => {
    e.preventDefault();
    
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        console.log(error)
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...inputs, img: downloadURL, categories: cat };
          addProduct(product, dispatch);
        });
      }
    );

  }


    return (
    <section className="add-new-box">
        <div className="shadow-sm card border-light">
            <div className="card-header admin-title">Add new NFT</div>
            <div className="p-4 align-items-center col">
            <Form onSubmit={handleClick}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Creator Name</Form.Label>
                    <Form.Control 
                    name="creator"
                    type="text" 
                    placeholder="Enter Name" 
                    onChange={handleChange} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>NFT Name</Form.Label>
                    <Form.Control 
                    name="title"
                    type="text" 
                    placeholder="Enter NFT Name" 
                    onChange={handleChange} />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Categories</Form.Label>
                    <Form.Control 
                    name="categories"
                    placeholder="Seperate by comma" 
                    onChange={handleCat} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Price</Form.Label>
                    <Form.Control 
                    name="price"
                    type="number" 
                    step="any"
                    placeholder="Enter ETH value" 
                    onChange={handleChange} />
                    </Form.Group>
                </Row>

                <FloatingLabel controlId="floatingTextarea" label="Enter Description here" className="mb-3">
                    <Form.Control 
                    name="desc"
                    as="textarea" 
                    placeholder="Enter Description here" 
                    style={{ height: '100px' }} onChange={handleChange} />
                </FloatingLabel>

                <Form.Group as={Col} controlId="formFile" className="mb-3">
                    <Form.Label>Upload an NFT image</Form.Label>
                    <Form.Control 
                    type="file" 
                    onChange={(e) => setFile(e.target.files[0])}
                     />
                </Form.Group>

                <Form.Group as={Col} controlId="formFile2" className="mb-3">
                    <Form.Label>Upload creator's image</Form.Label>
                    <Form.Control 
                    type="file" 
                     />
                </Form.Group>

                <Button className="px-3" variant="primary" type="submit">
                    Add
                </Button>
                </Form>
            </div>
        </div>
    </section>
    );
};

export default NewNft;