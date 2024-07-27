import * as github from '@actions/github';
import { SanitizedPayloadParams } from '../../interface';

export function getParams(): SanitizedPayloadParams {
  const payload = github.context.payload as any;

  let branchName = payload.ref;
  if (branchName.startsWith('refs/heads/')) {
    branchName = branchName.slice(11);
  }

  return {
    repository: {
      name: payload.repository.name,
      owner: payload.repository.owner.login,
    },
    branch: {
      name: branchName,
      headCommit: payload.head_commit.id,
      pullRequest: {
        url: undefined,
      },
    },
  };
}
