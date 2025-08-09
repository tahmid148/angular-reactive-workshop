// HELPFUL SNIPPET
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { map } from 'rxjs/operators';

import { Project } from '../../projects/project.model';
import { ProjectsService } from '../../projects/projects.service';
import { AddProject, LoadProjects, ProjectsActionsTypes, ProjectsAdded, ProjectsLoaded } from './projects.actions';
import { ProjectsState } from './projects.reducer';

@Injectable({providedIn: 'root'})
export class ProjectsEffects {

  @Effect() loadProjects$ = this.dataPersistence.fetch(ProjectsActionsTypes.LoadProjects, {
    run: (action: LoadProjects, state: ProjectsState) => {
      return this.projectsService.all().pipe(map((res: Project[]) => new ProjectsLoaded(res)))
    },
    onError: () => {}
  });

  @Effect() addProjects$ = this.dataPersistence.pessimisticUpdate(ProjectsActionsTypes.AddProject, {
    run: (action: AddProject, state: ProjectsState) => {
      return this.projectsService.create(action.payload).pipe(map((res: Project) => new ProjectsAdded(res)))
    },
    onError: () => {}
  });

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<ProjectsState>,
    private projectsService: ProjectsService
  ) {}
}
