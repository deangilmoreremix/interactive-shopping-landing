import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Comment {
  id: string;
  userId: string;
  timestamp: number;
  text: string;
  resolved: boolean;
}

interface Version {
  id: string;
  timestamp: number;
  changes: any[];
  author: string;
}

export function useCollaboration() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [versions, setVersions] = useState<Version[]>([]);
  const [collaborators, setCollaborators] = useState<string[]>([]);

  const addComment = useCallback((userId: string, text: string, timestamp: number) => {
    const newComment: Comment = {
      id: uuidv4(),
      userId,
      timestamp,
      text,
      resolved: false
    };
    setComments(prev => [...prev, newComment]);
  }, []);

  const resolveComment = useCallback((commentId: string) => {
    setComments(prev =>
      prev.map(comment =>
        comment.id === commentId
          ? { ...comment, resolved: true }
          : comment
      )
    );
  }, []);

  const createVersion = useCallback((changes: any[], author: string) => {
    const newVersion: Version = {
      id: uuidv4(),
      timestamp: Date.now(),
      changes,
      author
    };
    setVersions(prev => [...prev, newVersion]);
    return newVersion.id;
  }, []);

  const revertToVersion = useCallback((versionId: string) => {
    const version = versions.find(v => v.id === versionId);
    if (!version) return null;
    return version.changes;
  }, [versions]);

  const addCollaborator = useCallback((userId: string) => {
    setCollaborators(prev => [...prev, userId]);
  }, []);

  const removeCollaborator = useCallback((userId: string) => {
    setCollaborators(prev => prev.filter(id => id !== userId));
  }, []);

  return {
    comments,
    versions,
    collaborators,
    addComment,
    resolveComment,
    createVersion,
    revertToVersion,
    addCollaborator,
    removeCollaborator
  };
}