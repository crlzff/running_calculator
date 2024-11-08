import { useEffect } from 'react';

export const useDocumentMeta = (title, description) => {
    useEffect(() => {
      // Update title
      const previousTitle = document.title;
      document.title = title;
  
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      const previousDescription = metaDescription?.getAttribute('content');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
  
      // Cleanup function
      return () => {
        document.title = previousTitle;
        if (metaDescription && previousDescription) {
          metaDescription.setAttribute('content', previousDescription);
        }
      };
    }, [title, description]);
  };