
import axios from 'axios';

const API_URL = 'http://localhost:1337/api/blogs'; 

export const getBlogs = async () => {
  try {
    const response = await axios.get(`${API_URL}/?populate=*`);
    console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    console.error('Error fetching pages:', error);
    throw error;
  }
};

export const getBlogPostById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}/?populate=*`);
    console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    console.error('Error fetching page:', error);
    throw error;
  }
};

export const createBlog = async( postData ) => {
  try {
      const response = await axios.post(`${API_URL}`, postData);
      return response.data;
  } catch (error) {
      console.error('Error creating blog post:', error);
      throw error;
  }
}

  