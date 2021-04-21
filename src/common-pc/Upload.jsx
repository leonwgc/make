import React, { useState } from 'react';
import { Upload as AntUpload, Modal } from 'antd';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default function Upload({
  fileList = [],
  onFileListChange,
  data,
  action,
  children,
  showUploadList = true,
  showModal = true,
  ...antdUploadProps
}) {
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const onPreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
  };

  const onUploadChange = ({ file, fileList }) => {
    if (file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (file.status === 'done') {
      setLoading(false);
      onFileListChange(
        fileList.map((file) => {
          if (file.response) {
            let res = file.response;
            if (res.code == '0') {
              let r = res.result[0];
              return {
                url: r.cdnHref,
                uid: r.id,
                name: r.fileName,
              };
            }
          } else {
            return file;
          }
        })
      );
    }
  };

  const onRemove = (file) => {
    const list = fileList.filter((f) => f !== file);
    onFileListChange(list);
  };

  return (
    <>
      <AntUpload
        data={data}
        action={action}
        withCredentials={true}
        listType="picture-card"
        showUploadList={showUploadList}
        onChange={onUploadChange}
        onRemove={onRemove}
        onPreview={onPreview}
        multiple={false}
        fileList={fileList}
        {...antdUploadProps}
      >
        {children(loading, fileList)}
      </AntUpload>
      {showModal ? (
        <Modal
          visible={previewImage}
          title={null}
          footer={null}
          onCancel={() => setPreviewImage('')}
        >
          <img alt="preview-image" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      ) : null}
    </>
  );
}
