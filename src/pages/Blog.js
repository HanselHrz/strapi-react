import React, { useEffect, useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import {
  Container,
  ContentWithPaddingXl,
  ContentWithPaddingLg,
} from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; // eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import { SectionHeading } from "components/misc/Headings";
import { useParams } from "react-router-dom";
import { getBlogPostById } from "../service/strapi-services";
import edit from 'images/edit.svg'

const HeadingRow = tw.div`flex items-center mb-10`;
const Heading = tw(SectionHeading)`text-gray-900`;
const Image = tw(SectionHeading)`ml-4`
const Text = styled.div`
  ${tw`text-lg  text-gray-800`}
  p {
    ${tw`mt-2 leading-loose`}
  }
  h1 {
    ${tw`text-3xl font-bold mt-10`}
  }
  h2 {
    ${tw`text-2xl font-bold mt-8`}
  }
  h3 {
    ${tw`text-xl font-bold mt-6`}
  }
  ul {
    ${tw`list-disc list-inside`}
    li {
      ${tw`ml-2 mb-3`}
      p {
        ${tw`mt-0 inline leading-normal`}
      }
    }
  }
`;

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getBlogPostById(id);
        setPost(data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!post || !post.attributes) {
    return <div>No post found</div>;
  }

  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <ContentWithPaddingLg>
          <HeadingRow>
            <Heading>{post.attributes.blogTitle}</Heading>
            <Image><img src={edit} alt="Edit" /></Image>
          </HeadingRow>
          <Text>
            {post.attributes.blogContent}
          </Text>
        </ContentWithPaddingLg>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
};

export default BlogPost;
