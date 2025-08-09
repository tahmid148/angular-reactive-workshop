import { Action } from "@ngrx/store";
import { Project } from "../../projects/project.model";

export enum ProjectsActionsTypes {
  ProjectSelected = '[Project] Selected',
  LoadProjects = '[Project] Load Data',
  ProjectsLoaded = '[Project] Data Loaded',
  AddProject = '[Project] Add Data',
  ProjectAdded = '[Project] Data added',
  UpdateProject = '[Project] Update Data',
  DeleteProject = '[Project] Delete Data'
}

export class SelectProject implements Action {
  readonly type: string = ProjectsActionsTypes.ProjectSelected;
  constructor(public payload: string) {}
}

export class LoadProjects implements Action {
  readonly type: string = ProjectsActionsTypes.LoadProjects;
}

export class ProjectsLoaded implements Action {
  readonly type: string = ProjectsActionsTypes.ProjectsLoaded;
  constructor(public payload: Project[]) {}
}

export class AddProject implements Action {
  readonly type: string = ProjectsActionsTypes.AddProject;
  constructor(public payload: Project) {}
}

export class ProjectsAdded implements Action {
  readonly type: string = ProjectsActionsTypes.AddProject;
  constructor(public payload: Project) {}
}

export class UpdateProject implements Action {
  readonly type: string = ProjectsActionsTypes.UpdateProject;
  constructor(public payload: Project) {}
}

export class DeleteProject implements Action {
  readonly type: string = ProjectsActionsTypes.DeleteProject;
  constructor(public payload: Project) {}
}

export type ProjectActions = AddProject | ProjectsAdded | SelectProject | UpdateProject | DeleteProject | LoadProjects | ProjectsLoaded;
