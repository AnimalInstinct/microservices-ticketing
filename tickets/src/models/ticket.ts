import mongoose from 'mongoose'

// An interface that describes the properties that are required to create a new user
interface TicketAttrs {
  title: string
  price: number
  userId: string
}

// An Interface that describes the properties that a user document has
interface TicketDoc extends mongoose.Document {
  title: string
  price: number
  userId: string
}

// An Interface that describes the properties that a user model has
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    // Add only necessary information to JSON response
    // Rename Mongo _id to usual id acceptable by other services
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
      },
    },
  }
)

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs)
}

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema)

export { Ticket }
