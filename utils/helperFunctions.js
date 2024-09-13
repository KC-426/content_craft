import {
    getStorage,
    ref,
    getDownloadURL,
    uploadBytesResumable,
    deleteObject
  } from "firebase/storage";
  import app from "../config/firebaseConfig.js";
  import { v4 as uuidv4 } from 'uuid';

  const storage = getStorage(app);

export async function uploadUserProfileImageToFirebaseStorage(req, res) {
    try {
      if (!req.file) {
        return res.status(400).send({ error: "Image file is required." });
      }
  
      const dateTime = giveCurrentDateTime();
      const uniqueFilename = `${uuidv4()}_${req.file.originalname}_${dateTime}`;
      const storageRef = ref(storage, `user-images/${uniqueFilename}`);
      const metadata = { contentType: req.file.mimetype };
  
      const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
      const downloadURL = await getDownloadURL(snapshot.ref);
  
      console.log("File successfully uploaded");
  
      return {
        name: req.file.originalname,
        path: storageRef.fullPath,
        url: downloadURL,
      };
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while uploading the file.");
    }
  }

  export async function uploadIncidentReportImagesToFirebaseStorage(req, res) {
      try {
        if (!req.files || req.files.length === 0) {
          return res.status(400).send({ error: "Image files are required." });
        }
    
        const uploadPromises = req.files.map(async (file) => {
          const dateTime = giveCurrentDateTime();
          const uniqueFilename = `${uuidv4()}_${file.originalname}_${dateTime}`;
          const storageRef = ref(storage, `incident-report-images/${uniqueFilename}`);
          const metadata = { contentType: file.mimetype };
    
          const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
          const downloadURL = await getDownloadURL(snapshot.ref);
          return {
            name: file.originalname,
            path: storageRef.fullPath,
            url: downloadURL,
          };
        });
    
        const uploadedFiles = await Promise.all(uploadPromises);
        return uploadedFiles;
      } catch (error) {
        console.error(error);
        throw new Error("An error occurred while uploading the files.");
      }
    }

    export async function uploadAccountAssistanceSupportImagesToFirebaseStorage(req, res) {
      try {
        if (!req.files || req.files.length === 0) {
          return res.status(400).send({ error: "Image files are required." });
        }
    
        const uploadPromises = req.files.map(async (file) => {
          const dateTime = giveCurrentDateTime();
          const uniqueFilename = `${uuidv4()}_${file.originalname}_${dateTime}`;
          const storageRef = ref(storage, `technical-issue-support-images/${uniqueFilename}`);
          const metadata = { contentType: file.mimetype };
    
          const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
          const downloadURL = await getDownloadURL(snapshot.ref);
          return {
            name: file.originalname,
            path: storageRef.fullPath,
            url: downloadURL,
          };
        });
    
        const uploadedFiles = await Promise.all(uploadPromises);
        return uploadedFiles;
      } catch (error) {
        console.error(error);
        throw new Error("An error occurred while uploading the files.");
      }
    }

    export async function uploadTechnicalIssueSupportImagesToFirebaseStorage(req, res) {
      try {
        if (!req.files || req.files.length === 0) {
          return res.status(400).send({ error: "Image files are required." });
        }
    
        const uploadPromises = req.files.map(async (file) => {
          const dateTime = giveCurrentDateTime();
          const uniqueFilename = `${uuidv4()}_${file.originalname}_${dateTime}`;
          const storageRef = ref(storage, `account-assitance-support-images/${uniqueFilename}`);
          const metadata = { contentType: file.mimetype };
    
          const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
          const downloadURL = await getDownloadURL(snapshot.ref);
          return {
            name: file.originalname,
            path: storageRef.fullPath,
            url: downloadURL,
          };
        });
    
        const uploadedFiles = await Promise.all(uploadPromises);
        return uploadedFiles;
      } catch (error) {
        console.error(error);
        throw new Error("An error occurred while uploading the files.");
      }
    }

    export async function uploadContentGenerationIssueSupportImagesToFirebaseStorage(req, res) {
      try {
        if (!req.files || req.files.length === 0) {
          return res.status(400).send({ error: "Image files are required." });
        }
    
        const uploadPromises = req.files.map(async (file) => {
          const dateTime = giveCurrentDateTime();
          const uniqueFilename = `${uuidv4()}_${file.originalname}_${dateTime}`;
          const storageRef = ref(storage, `content-generation-issue-support-images/${uniqueFilename}`);
          const metadata = { contentType: file.mimetype };
    
          const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
          const downloadURL = await getDownloadURL(snapshot.ref);
          return {
            name: file.originalname,
            path: storageRef.fullPath,
            url: downloadURL,
          };
        });
    
        const uploadedFiles = await Promise.all(uploadPromises);
        return uploadedFiles;
      } catch (error) {
        console.error(error);
        throw new Error("An error occurred while uploading the files.");
      }
    }

    export async function uploadConsultWithAIImagesToFirebaseStorage(req, res) {
      try {
        if (!req.files || req.files.length === 0) {
          return res.status(400).send({ error: "Image files are required." });
        }
    
        const uploadPromises = req.files.map(async (file) => {
          const dateTime = giveCurrentDateTime();
          const uniqueFilename = `${uuidv4()}_${file.originalname}_${dateTime}`;
          const storageRef = ref(storage, `consult-with-AI-images/${uniqueFilename}`);
          const metadata = { contentType: file.mimetype };
    
          const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
          const downloadURL = await getDownloadURL(snapshot.ref);
          return {
            name: file.originalname,
            path: storageRef.fullPath,
            url: downloadURL,
          };
        });
    
        const uploadedFiles = await Promise.all(uploadPromises);
        return uploadedFiles;
      } catch (error) {
        console.error(error);
        throw new Error("An error occurred while uploading the files.");
      }
    }

 export async function deleteImageFromFirebaseStorage(imagePath) {
    try {
      const storageRef = ref(storage, imagePath);
  
      await deleteObject(storageRef);
    } catch (error) {
      if (error.code === "storage/object-not-found") {
        console.warn("Image not found in Firebase Storage, nothing to delete.");
      } else {
        console.error(error.message);
        throw new Error("An error occurred while deleting the image.");
      }
    }
  }
  
  function giveCurrentDateTime() {
    const today = new Date();
    const date =
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    const time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + " " + time;
    return dateTime;
  }