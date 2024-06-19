import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import tw from "twin.macro";
import { PrimaryButton } from "components/misc/Buttons";
import { SectionHeading } from "components/misc/Headings";
import Header from "components/headers/light.js";
import { getBlogPostById, updateBlog, deleteBlog } from "../service/strapi-services";
import iconDelete from 'images/delete.svg'

const Image = tw.button`ml-4`;
const Form = tw.form`mx-auto max-w-screen-lg`;
const Input = tw.input`w-full p-4 mt-4 bg-gray-200 rounded-lg border border-gray-300 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500`;
const Textarea = tw.textarea`w-full h-64 p-4 mt-4 bg-gray-200 rounded-lg border border-gray-300 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500`;
const SubmitButton = tw(PrimaryButton)`w-full mt-8`;
const Label = tw.label`block text-sm font-medium text-gray-700`;
const HeadingRow = tw.div`flex items-center justify-between mb-10`;
const Heading = tw(SectionHeading)`text-gray-900`;

const EditBlog = () => {
  const { id } = useParams();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let headingText = "Edita tu post";

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBlogPostById(id);
      console.log(data)
      const { attributes } = data;
      setTitle(attributes.blogTitle);
      setCategory(attributes.category);
      setPublishedDate(attributes.publishedDate);
      setDescription(attributes.description);
      setContent(attributes.blogContent);
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlog(id);
        history.push('/'); 
        alert('Blog post deleted successfully!');
      } catch (error) {
        console.error('Error deleting blog post:', error);
        setError('Failed to delete blog post.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('data', JSON.stringify({
      blogTitle: title,
      category: category,
      publishedDate: publishedDate,
      description: description,
      blogContent: content
    }));

    if (coverImage) {
      formData.append('files.coverImage', coverImage, coverImage.name);
    }

    try {
      await updateBlog(id, formData); // Assuming updateBlog is similar to createBlog but for updates
      alert("Post updated successfully!");
    } catch (error) {
      console.error('Error updating blog post:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <ContentWithPaddingXl>
          <HeadingRow>
            <Heading>{headingText}</Heading>
            <Image onClick={handleDelete}>
              <img src={iconDelete} alt="Delete" />
            </Image>
          </HeadingRow>
          <Form onSubmit={handleSubmit}>
            {error && (
              <p style={{ backgroundColor: "red", color: "white", padding: "12px", borderRadius: "8px", marginTop: "16px", marginBottom: "10px" }}>
                {error}
              </p>
            )}
            <Label>Title</Label>
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Label>Category</Label>
            <Input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            <Label>Published Date</Label>
            <Input
              type="date"
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
              required
            />
            <Label>Description</Label>
            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <Label>Content</Label>
            <Textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <Label>Cover Image</Label>
            <Input
              type="file"
              onChange={(e) => setCoverImage(e.target.files[0])}
            />
            <SubmitButton type="submit" disabled={loading}>
              {loading ? "Cargando..." : "Actualizar Post"}
            </SubmitButton>
          </Form>
        </ContentWithPaddingXl>
      </Container>
    </AnimationRevealPage>
  );
};

export default EditBlog;
