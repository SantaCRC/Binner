﻿using Binner.Model.Common;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Binner.Common.Services
{
    public interface IProjectService
    {
        /// <summary>
        /// Add a new project
        /// </summary>
        /// <param name="project"></param>
        /// <returns></returns>
        Task<Project> AddProjectAsync(Project project);

        /// <summary>
        /// Update an existing project
        /// </summary>
        /// <param name="project"></param>
        /// <returns></returns>
        Task<Project> UpdateProjectAsync(Project project);

        /// <summary>
        /// Delete an existing project
        /// </summary>
        /// <param name="project"></param>
        /// <returns></returns>
        Task<bool> DeleteProjectAsync(Project project);

        /// <summary>
        /// Get a project
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        Task<Project> GetProjectAsync(long projectId);

        /// <summary>
        /// Get a project
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        Task<Project> GetProjectAsync(string name);

        /// <summary>
        /// Get all projects
        /// </summary>
        /// <returns></returns>
        Task<ICollection<Project>> GetProjectsAsync(PaginatedRequest request);
    }
}
