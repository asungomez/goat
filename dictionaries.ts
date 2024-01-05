export const dictionaries = {
  en: {
    'admin-only': 'You need to be admin to perform this action',
    cityForm: {
      buttons: {
        cancel: 'Cancel',
        save: 'Save',
      },
      labels: {
        images: 'Images',
        name: 'Name',
        slug: 'Slug',
        description: 'Description',
      },
      titles: {
        en: 'English',
        es: 'Spanish',
      },
      errors: {
        name: {
          required: 'Name is required',
        },
        slug: {
          required: 'Slug is required',
          format: 'Slug can only contain letters, numbers and dashes',
        },
        description: {
          required: 'Description is required',
        },
      },
    },
    clear: 'Clear',
    'click-to-upload': 'Click to upload',
    content: 'Content',
    'editor-only': 'You need to be editor to perform this action',
    'empty-message': 'This looks empty',
    forbidden: 'Forbidden',
    'internal-error': 'Internal error',
    'load-more': 'Load more',
    loading: 'Loading',
    'or-drag-and-drop': 'or drag and drop',
    reload: 'Reload',
    'search-failed': 'The search operation failed. Please try again.',
    searching: 'Searching',
    'something-went-wrong': 'Something went wrong',
    'try-again-later': 'Please try again later.',
  },
  es: {
    'admin-only': 'Necesitas ser Administrador para llevar a cabo esta acción',
    cityForm: {
      buttons: {
        cancel: 'Cancelar',
        save: 'Guardar',
      },
      labels: {
        images: 'Imágenes',
        name: 'Nombre',
        slug: 'Slug',
        description: 'Descripción',
      },
      titles: {
        en: 'Inglés',
        es: 'Español',
        description: 'Descripción',
      },
      errors: {
        name: {
          required: 'El nombre es obligatorio',
        },
        slug: {
          required: 'El slug es obligatorio',
          format: 'El slug sólo puede contener letras, números y guiones',
        },
        description: {
          required: 'La descripción es obligatoria',
        },
      },
    },
    clear: 'Borrar',
    'click-to-upload': 'Click para seleccionar',
    content: 'Contenido',
    'editor-only': 'Necesitas ser Editor para llevar a cabo esta acción',
    'empty-message': 'Parece que aquí no hay nada',
    forbidden: 'Acceso restringido',
    'internal-error': 'Error interno',
    'load-more': 'Ver más',
    loading: 'Cargando',
    'or-drag-and-drop': 'o arrastra aquí',
    reload: 'Volver a cargar',
    'search-failed': 'La búsqueda ha fallado. Por favor, inténtalo de nuevo.',
    searching: 'Buscando',
    'something-went-wrong': 'Algo ha fallado',
    'try-again-later': 'Por favor, inténtalo de nuevo más tarde.',
  },
} as const;
