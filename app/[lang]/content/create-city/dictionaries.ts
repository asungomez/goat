export const dictionaries = {
  en: {
    form: {
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
          format: 'Slug can only contain letters and dashes',
        },
        description: {
          required: 'Description is required',
        },
      },
    },
    title: 'Create city',
  },
  es: {
    form: {
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
          format: 'El slug sólo puede contener letras y guiones',
        },
        description: {
          required: 'La descripción es obligatoria',
        },
      },
    },
    title: 'Crear ciudad',
  },
} as const;
