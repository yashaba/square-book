export interface IBook{
    id: string
    title: string
    subtitle: string
    authors: string[]
    publishedDate: string
    pageCount: number
    categories: string[]
    imageLinks: {
      smallThumbnail: string
      thumbnail: string
    }
    language: string
    previewLink: string
    infoLink: string
    canonicalVolumeLink: string
    description: string
   }