# 📸 Cloudinary Image Upload Integration Guide

## Overview

This guide explains how to use the Cloudinary image upload functionality integrated into the DSofts API. Admin users can upload images for portfolio projects, services, and other content.

---

## 🔧 Setup Cloudinary Account

### Step 1: Create Cloudinary Account

1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for a free account
3. Verify your email

### Step 2: Get API Credentials

1. Login to your Cloudinary dashboard
2. Go to **Dashboard** → **Account Details**
3. Copy the following credentials:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### Step 3: Add Credentials to Environment Variables

#### Local Development (.env)

```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

#### Production (Render)

1. Go to your Render dashboard
2. Select your service
3. Go to **Environment** tab
4. Add the following environment variables:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

---

## 🚀 API Endpoints

### 1. Upload Single Image

**Endpoint:** `POST /api/upload/image`  
**Auth Required:** Yes (Admin only)  
**Content-Type:** `multipart/form-data`

#### Request

```bash
# Using cURL
curl -X POST https://dsofts-server-bj3s.onrender.com/api/upload/image \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -F "image=@/path/to/image.jpg" \
  -F "folder=portfolio"
```

#### Request Body (Form Data)

| Field    | Type   | Required | Description                                |
| -------- | ------ | -------- | ------------------------------------------ |
| `image`  | File   | Yes      | Image file (jpeg, jpg, png, gif, webp)     |
| `folder` | String | No       | Cloudinary folder name (default: 'dsofts') |

#### Response (Success - 200)

```json
{
  "message": "Image uploaded successfully",
  "url": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/portfolio/image.jpg",
  "publicId": "portfolio/image",
  "format": "jpg",
  "width": 1920,
  "height": 1080
}
```

---

### 2. Upload Multiple Images

**Endpoint:** `POST /api/upload/images`  
**Auth Required:** Yes (Admin only)  
**Content-Type:** `multipart/form-data`

#### Request

```bash
# Using cURL
curl -X POST https://dsofts-server-bj3s.onrender.com/api/upload/images \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -F "images=@/path/to/image1.jpg" \
  -F "images=@/path/to/image2.jpg" \
  -F "folder=portfolio"
```

#### Request Body (Form Data)

| Field    | Type   | Required | Description                                |
| -------- | ------ | -------- | ------------------------------------------ |
| `images` | File[] | Yes      | Array of image files (max 10)              |
| `folder` | String | No       | Cloudinary folder name (default: 'dsofts') |

#### Response (Success - 200)

```json
{
  "message": "Images uploaded successfully",
  "images": [
    {
      "url": "https://res.cloudinary.com/.../image1.jpg",
      "publicId": "portfolio/image1",
      "format": "jpg",
      "width": 1920,
      "height": 1080
    },
    {
      "url": "https://res.cloudinary.com/.../image2.jpg",
      "publicId": "portfolio/image2",
      "format": "png",
      "width": 1280,
      "height": 720
    }
  ],
  "count": 2
}
```

---

### 3. Delete Image

**Endpoint:** `DELETE /api/upload/image`  
**Auth Required:** Yes (Admin only)  
**Content-Type:** `application/json`

#### Request

```bash
# Using cURL
curl -X DELETE https://dsofts-server-bj3s.onrender.com/api/upload/image \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"publicId": "portfolio/image"}'
```

#### Request Body (JSON)

```json
{
  "publicId": "portfolio/image"
}
```

#### Response (Success - 200)

```json
{
  "message": "Image deleted successfully",
  "publicId": "portfolio/image"
}
```

---

## 📋 Usage Examples

### Example 1: Upload Portfolio Project Image

#### Step 1: Upload Image

```javascript
// Using JavaScript Fetch API
const formData = new FormData();
formData.append('image', imageFile);
formData.append('folder', 'portfolio');

const response = await fetch(
  'https://dsofts-server-bj3s.onrender.com/api/upload/image',
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
    body: formData,
  },
);

const data = await response.json();
console.log('Image URL:', data.url);
```

#### Step 2: Create Portfolio Project with Uploaded Image

```javascript
const projectData = {
  title: 'E-commerce Platform',
  slug: 'ecommerce-platform',
  thumbnailImageUrl: data.url, // Use uploaded image URL
  bannerImageUrl: data.url,
  shortDescription: 'Modern e-commerce solution',
  fullDescription: 'A complete e-commerce platform...',
  techStack: ['React', 'Node.js', 'MongoDB'],
  clientName: 'ABC Corp',
  clientRating: 4.8,
  isFeatured: true,
};

const projectResponse = await fetch(
  'https://dsofts-server-bj3s.onrender.com/api/admin/projects',
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${adminToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectData),
  },
);
```

---

### Example 2: Upload Multiple Images for Gallery

```javascript
const formData = new FormData();
formData.append('images', imageFile1);
formData.append('images', imageFile2);
formData.append('images', imageFile3);
formData.append('folder', 'gallery');

const response = await fetch(
  'https://dsofts-server-bj3s.onrender.com/api/upload/images',
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
    body: formData,
  },
);

const data = await response.json();
console.log('Uploaded images:', data.images);
```

---

## 🎨 Folder Structure

Recommended folder structure in Cloudinary:

```
dsofts/
├── portfolio/          # Portfolio project images
├── services/           # Service-related images
├── gallery/            # General gallery images
├── team/               # Team member photos
└── clients/            # Client logos
```

---

## ⚙️ Configuration

### File Restrictions

- **Allowed formats:** jpeg, jpg, png, gif, webp
- **Max file size:** 5MB per file
- **Max files (multiple upload):** 10 files

### Image Transformations

Images are automatically optimized with:

- Quality: Auto
- Format: Auto (best format for browser)

---

## 🔒 Security

1. **Authentication Required:** All upload endpoints require admin authentication
2. **File Type Validation:** Only image files are accepted
3. **File Size Limit:** Maximum 5MB per file
4. **Admin Only:** Only users with admin role can upload/delete images

---

## 🐛 Troubleshooting

### Error: "No file uploaded"

- **Cause:** File not included in request or wrong field name
- **Solution:** Ensure you're using `image` field for single upload or `images` for multiple

### Error: "Only image files are allowed"

- **Cause:** Uploaded file is not an image
- **Solution:** Only upload jpeg, jpg, png, gif, or webp files

### Error: "File too large"

- **Cause:** File exceeds 5MB limit
- **Solution:** Compress or resize the image before uploading

### Error: "Access denied. Admin only"

- **Cause:** Not logged in as admin
- **Solution:** Login with admin credentials (email must contain @dsofts.com)

### Error: "Failed to upload image"

- **Cause:** Cloudinary credentials not configured
- **Solution:** Check environment variables are set correctly

---

## 📝 Postman Testing

### Upload Single Image

1. **Method:** POST
2. **URL:** `{{baseUrl}}/api/upload/image`
3. **Headers:**
   - `Authorization: Bearer {{authToken}}`
4. **Body:** form-data
   - Key: `image` (Type: File)
   - Key: `folder` (Type: Text) - Value: `portfolio`

### Upload Multiple Images

1. **Method:** POST
2. **URL:** `{{baseUrl}}/api/upload/images`
3. **Headers:**
   - `Authorization: Bearer {{authToken}}`
4. **Body:** form-data
   - Key: `images` (Type: File) - Select multiple files
   - Key: `folder` (Type: Text) - Value: `portfolio`

### Delete Image

1. **Method:** DELETE
2. **URL:** `{{baseUrl}}/api/upload/image`
3. **Headers:**
   - `Authorization: Bearer {{authToken}}`
   - `Content-Type: application/json`
4. **Body:** raw (JSON)

```json
{
  "publicId": "portfolio/image-name"
}
```

---

## 🎯 Best Practices

1. **Use Descriptive Folder Names:** Organize images by category (portfolio, services, etc.)
2. **Optimize Before Upload:** Compress images to reduce file size
3. **Use Consistent Naming:** Use clear, descriptive filenames
4. **Delete Unused Images:** Clean up old images to save storage
5. **Store Public IDs:** Save the `publicId` if you need to delete images later

---

## 🔗 Integration with Frontend

### React Example

```jsx
import { useState } from 'react';

function ImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', 'portfolio');

    try {
      const response = await fetch(
        'https://dsofts-server-bj3s.onrender.com/api/upload/image',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: formData,
        },
      );

      const data = await response.json();
      setImageUrl(data.url);
      console.log('Image uploaded:', data.url);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} accept="image/*" />
      {uploading && <p>Uploading...</p>}
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
}
```

---

## ✅ Summary

- ✅ Admin users can upload images to Cloudinary
- ✅ Images are automatically optimized
- ✅ Supports single and multiple file uploads
- ✅ Images can be organized in folders
- ✅ Secure with admin-only access
- ✅ Easy integration with portfolio projects and services

---

**Need Help?** Check the troubleshooting section or contact support.
