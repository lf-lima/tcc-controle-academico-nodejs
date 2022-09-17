import multer from 'multer'

export function uploadFileMiddleware () {
  const storage = multer.memoryStorage()
  const upload = multer({ storage })

  return upload.single('uploaded_file')
}
