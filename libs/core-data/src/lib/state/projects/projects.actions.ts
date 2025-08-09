import { Action } from "@ngrx/store";
import { Project } from "../../projects/project.model";

export enum ProjectsActionsTypes {
  ProjectSelected = '[Project] Selected',
  AddProject = '[Project] Add Data',
  UpdateProject = '[Project] Update Data',
  DeleteProject = '[Project] Delete Data'
}

export class SelectProject implements Action {
  readonly type: string = ProjectsActionsTypes.ProjectSelected;
  constructor(private payload: Project) {}
}
export class AddProject implements Action {
  readonly type: string = ProjectsActionsTypes.AddProject;
  constructor(private payload: Project) {}
}

export class UpdateProject implements Action {
  readonly type: string = ProjectsActionsTypes.UpdateProject;
  constructor(private payload: Project) {}
}

export class DeleteProject implements Action {
  readonly type: string = ProjectsActionsTypes.DeleteProject;
  constructor(private payload: Project) {}
}

export type ProjectActions = AddProject | SelectProject | UpdateProject | DeleteProject;
