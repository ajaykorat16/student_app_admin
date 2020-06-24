import React from 'react';

const Dashboard = React.lazy(() => import('./Components/Dashboard/Dashboard'));
const Users = React.lazy(() => import('./Components/Users/Users'));
const User = React.lazy(() => import('./Components/Users/User'));
const Standards = React.lazy(() => import('./Components/Standards/Standards'));
const StandardsCreate = React.lazy(() => import('./Components/Standards/StandardsCreate'));
const StandardsEdit = React.lazy(() => import('./Components/Standards/StandardsEdit'));

const Subjects = React.lazy(() => import('./Components/Subjects/Subjects'));
const SubjectsCreate = React.lazy(() => import('./Components/Subjects/SubjectCreate'));
const SubjectsEdit = React.lazy(() => import('./Components/Subjects/SubjectEdit'));

const Chapters = React.lazy(() => import('./Components/Chapters/Chapters'));
const ChaptersCreate = React.lazy(() => import('./Components/Chapters/ChapterCreate'));
const ChaptersEdit = React.lazy(() => import('./Components/Chapters/ChapterEdit'));

const Topics = React.lazy(() => import('./Components/Topics/Topics'));
const TopicsCreate = React.lazy(() => import('./Components/Topics/TopicCreate'));
const TopicsEdit = React.lazy(() => import('./Components/Topics/TopicEdit'));

const Faqs = React.lazy(() => import('./Components/Faqs/Faqs'));
const FaqsCreate = React.lazy(() => import('./Components/Faqs/FaqCreate'));
const FaqsEdit = React.lazy(() => import('./Components/Faqs/FaqEdit'));

const Reviews = React.lazy(() => import('./Components/Reviews/Reviews'));

const SchoolResults = React.lazy(() => import('./Components/SchoolResults/SchoolResults'));

const Teachers = React.lazy(() => import('./Components/Teachers/Teachers'));
const TeachersCreate = React.lazy(() => import('./Components/Teachers/TeacherCreate'));
const TeachersEdit = React.lazy(() => import('./Components/Teachers/TeacherEdit'));

const DemoVideo = React.lazy(() => import('./Components/DemoVideo/DemoVideo'));

const Tests = React.lazy(() => import('./Components/Tests/Tests'));
const TestsCreate = React.lazy(() => import('./Components/Tests/TestCreate'));
const TestsEdit = React.lazy(() => import('./Components/Tests/TestEdit'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/standards', exact: true, name: 'Standards', component: Standards },
  { path: '/standards/create', exact: true, name: 'Standard Create', component: StandardsCreate },
  { path: '/standards/edit/:id', exact: true, name: 'Standard Edit', component: StandardsEdit },
  { path: '/subjects', exact: true, name: 'Subjects', component: Subjects },
  { path: '/subjects/create', exact: true, name: 'Subject Create', component: SubjectsCreate },
  { path: '/subjects/edit/:id', exact: true, name: 'Subject Edit', component: SubjectsEdit },

  { path: '/chapters', exact: true, name: 'Chapters', component: Chapters },
  { path: '/chapters/create', exact: true, name: 'Chapter Create', component: ChaptersCreate },
  { path: '/chapters/edit/:id', exact: true, name: 'Chapter Edit', component: ChaptersEdit },

  { path: '/topics', exact: true, name: 'Topics', component: Topics },
  { path: '/topics/create', exact: true, name: 'Topic Create', component: TopicsCreate },
  { path: '/topics/edit/:id', exact: true, name: 'Topic Edit', component: TopicsEdit },

  { path: '/faqs', exact: true, name: 'Faqs', component: Faqs },
  { path: '/faqs/create', exact: true, name: 'Faq Create', component: FaqsCreate },
  { path: '/faqs/edit/:id', exact: true, name: 'Faq Edit', component: FaqsEdit },

  { path: '/reviews', exact: true, name: 'Reviews', component: Reviews },

  { path: '/school_results', exact: true, name: 'School Results', component: SchoolResults },

  { path: '/teachers', exact: true, name: 'Teachers', component: Teachers },
  { path: '/teachers/create', exact: true, name: 'Teacher Create', component: TeachersCreate },
  { path: '/teachers/edit/:id', exact: true, name: 'Teacher Edit', component: TeachersEdit },

  { path: '/demo_video', exact: true, name: 'Demo Video', component: DemoVideo },

  { path: '/tests', exact: true, name: 'Tests', component: Tests },
  { path: '/tests/create', exact: true, name: 'Test Create', component: TestsCreate },
  { path: '/tests/edit/:id', exact: true, name: 'Test Edit', component: TestsEdit },

];

export default routes;
