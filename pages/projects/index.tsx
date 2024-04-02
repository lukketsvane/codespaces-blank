// pages/project
import { useState } from "react";
import { Flex, Heading, Input, Stack, Text, Image, Link, SimpleGrid, Box, AspectRatio } from "@chakra-ui/react";
import { getAllProjectData, Project, getTimelineData, TimelineItem } from "../../lib/projects";
import type { NextPageWithLayout } from "next";
import Layout from "../../components/Layout";
import { NextSeo } from "next-seo";
import { Timeline } from "../../components/Timeline";

interface ProjectsProps {
  projects: Project[];
  timeline: TimelineItem[];
}

const Projects: NextPageWithLayout<ProjectsProps> = ({ projects, timeline }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const handleTypeFilterChange = (type: string) => {
    setTypeFilter(type);
  };

  const handleCategoryFilterChange = (category: string) => {
    setCategoryFilter(category);
  };

  const latestProjects = projects.slice(0, 3);

  return (
    <>
      <NextSeo title="Projects | Iver Finne" />
      <Flex direction="column" align="flex-start" width="100%" gap={3}>
        <Heading as="h1" size="xl" > build-in-public log</Heading>
        <Text fontSize='0.9em' mb={6}>refuge for my poorly posed conjectures, research still pending.</Text>
        <SimpleGrid columns={{ base: 1, md: 1, lg: 3 }} spacing={4} width="100%" mb={6}>
          {latestProjects.map((project) => (
            <Link key={project.title} href={project.url} isExternal>
              <Box borderWidth="1px" borderRadius="lg" overflow="hidden" _hover={{ shadow: "md" }}>
                <AspectRatio ratio={16 / 9}>
                  <Image src={project.image} alt={project.title} objectFit="cover" />
                </AspectRatio>
                <Box p={4}>
                  <Heading as="h3" size="sm" mb={2} noOfLines={1}>
                    {project.title}
                  </Heading>
                  <Text fontSize="sm" noOfLines={2}>{project.description}</Text>
                </Box>
              </Box>
            </Link>
          ))}
        </SimpleGrid>
        <Input
          placeholder="Type here to search"
          mb={2}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Timeline
          items={timeline}
          searchQuery={searchQuery}
          typeFilter={typeFilter}
          categoryFilter={categoryFilter}
          onTypeFilterChange={handleTypeFilterChange}
          onCategoryFilterChange={handleCategoryFilterChange}
        />
      </Flex>
    </>
  );
};

export default Projects;

Projects.getLayout = (page) => <Layout>{page}</Layout>;

export async function getStaticProps() {
  const projects = getAllProjectData();
  const timeline = getTimelineData();
  return { props: { projects, timeline } };
}