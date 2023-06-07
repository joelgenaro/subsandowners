import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const DropZone = ({ parentAttachments }) => {
  const [files, setFiles] = useState([]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxSize: 25000000,
    accept: {
      "*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(() => {
    parentAttachments(files);
  }, [files]);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const thumbs = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>
          Drag & drop any images or videos that might be helpful in explaining
          your brief here (Max file size: 25 MB).
        </p>
      </div>
      <aside>
        <h4>&nbsp;</h4>
        <ul>{thumbs}</ul>
      </aside>
    </section>
  );
};

export default DropZone;
