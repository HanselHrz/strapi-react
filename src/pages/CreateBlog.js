import React, { useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import tw from "twin.macro";
import { PrimaryButton } from "components/misc/Buttons";
import { createBlog } from "service/strapi-services";
import { SectionHeading } from "components/misc/Headings";
import Header from "components/headers/light.js";

const Form = tw.form`mx-auto max-w-screen-lg`;
const Input = tw.input`w-full p-4 mt-4 bg-gray-200 rounded-lg border border-gray-300 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500`;
const Textarea = tw.textarea`w-full h-64 p-4 mt-4 bg-gray-200 rounded-lg border border-gray-300 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500`;
const SubmitButton = tw(PrimaryButton)`w-full mt-8`;
const Label = tw.label`block text-sm font-medium text-gray-700`;
const HeadingRow = tw.div`m-auto`;
const Heading = tw(SectionHeading)`text-gray-900`;

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  let headingText = "Crea tu post";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const postData = {
        data: {
            blogTitle: title,
            category: category,
            publishedDate: publishedDate,
            description: description,
            blogContent: content
        }
    };

    try {
        await createBlog(postData)
        setSuccess(true);
        setTitle("");
        setCategory("");
        setPublishedDate("");
        setDescription("");
        setContent("");
    } catch (error) {
        console.error('Error creating blog post:', error);
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
          </HeadingRow>
          <Form onSubmit={handleSubmit}>
            {error && <p tw="text-red-500 mt-4">{error}</p>}
            {success && <p tw="text-green-500 mt-4">Post created successfully!</p>}
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
              placeholder="Published Date"
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
            <SubmitButton type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </SubmitButton>
          </Form>
        </ContentWithPaddingXl>
      </Container>
    </AnimationRevealPage>
  );
};

export default CreateBlog;
