import { Project } from './../../projects/project.model';

const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Project One',
    details: 'This is a sample project',
    percentComplete: 20,
    approved: false,
    customerId: null
  },
  {
    id: '2',
    title: 'Project Two',
    details: 'This is a sample project',
    percentComplete: 40,
    approved: false,
    customerId: null
  },
  {
    id: '3',
    title: 'Project Three',
    details: 'This is a sample project',
    percentComplete: 100,
    approved: true,
    customerId: null
  }
];

const createProject = (projects, project) => [...projects, project];
const updateProject = (projects, project) => projects.map(p => {
  return p.id === project.id ? Object.assign({}, project) : p;
});
const deleteProject = (projects, project) => projects.filter(w => project.id !== w.id);

// Step 1 - Define the shape of my state
export interface ProjectsState {
  projects: Project[];
  selectedProjectId: string | null;
}

// Step 2 - Define initial state
export const initialState: ProjectsState = {
  projects: initialProjects,
  selectedProjectId: null
}

// Step 3 - Build the reducer
export function projectsReducer(state = initialState, action): ProjectsState {
  switch (action.type) {
    case 'create':
      return {
        projects: createProject(state.projects, action.payload),
        selectedProjectId: state.selectedProjectId
      }
    case 'update':
      return {
        projects: updateProject(state.projects, action.payload),
        selectedProjectId: state.selectedProjectId
      }
    case 'delete':
      return {
        projects: deleteProject(state.projects, action.payload),
        selectedProjectId: state.selectedProjectId
      }
    default:
      return state;
  }
}
