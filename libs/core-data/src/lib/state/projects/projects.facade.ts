// Facade

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { selectAllProjects, selectCurrentProject } from './..';
import * as ProjectsActions from './projects.actions';
import { ProjectsState } from './projects.reducer';

@Injectable({
  providedIn: 'root'
})
export class ProjectsFacade {
  allProjects$ = this.store.pipe(select(selectAllProjects));
  currentProject$ = this.store.pipe(select(selectCurrentProject));

  constructor(private store: Store<ProjectsState>) {
    this.allProjects$ = this.store.select(selectAllProjects);
    this.currentProject$ = this.store.select(selectCurrentProject);
  }

  selectProject(projectId) {
    this.store.dispatch(new ProjectsActions.SelectProject(projectId));
  }

  loadAll() {
    this.store.dispatch(new ProjectsActions.LoadProjects());
  }

  createProject(project) {
    this.store.dispatch(new ProjectsActions.AddProject(project));
  }

  updateProject(project) {
    this.store.dispatch(new ProjectsActions.UpdateProject(project));
  }

  deleteProject(project) {
    this.store.dispatch(new ProjectsActions.DeleteProject(project));
  }
}
