import { MongoClient } from 'mongodb'
import {
  failureServiceResponse,
  ILink,
  IServiceResponse,
  successfulServiceResponse,
} from '../types'

/**
 * LinkCollectionConnection acts as an in-between communicator between
 * the MongoDB database and LinkGateway. LinkCollectionConnection
 * defines methods that interact directly with MongoDB. That said,
 * it does not include any of the complex logic that LinkGateway has.
 *
 * @param {MongoClient} client
 * @param {string} collectionName
 */
export class LinkCollectionConnection {
  client: MongoClient
  collectionName: string

  constructor(mongoClient: MongoClient, collectionName?: string) {
    this.client = mongoClient
    this.collectionName = collectionName ?? 'links'
  }

  /**
   *
   * TODO [Lab 2]
   *
   * Deletes links when given a list of linkIds.
   * @param {string[]} linkIds
   * @return successfulServiceResponse<{}> on success
   *         failureServiceResponse on failure
   */
  async deleteLinks(linkIds: string[]): Promise<IServiceResponse<{}>> {
    const collection = await this.client.db().collection(this.collectionName)
    const myQuery = { linkId: { $in: linkIds } }
    const deleteResponse = await collection.deleteMany(myQuery)
    // we use result.ok to error check deleteMany
    if (deleteResponse.result.ok) {
      return successfulServiceResponse({})
    }
    return failureServiceResponse('Failed to delete links')
  }

  /**
   * Inserts a new link into the database
   * Returns successfulServiceResponse with ILink that was inserted as the payload
   *
   * @param {ILink} link
   * @return successfulServiceResponse<ILink>
   */
  async insertLink(link: ILink): Promise<IServiceResponse<ILink>> {
    return failureServiceResponse('Hidden for assignment')
  }

  /**
   * Clears the entire link collection in the database.
   * @return successfulServiceResponse<{}> on success
   *         failureServiceResponse on failure
   */
  async clearLinkCollection(): Promise<IServiceResponse<{}>> {
    return failureServiceResponse('Hidden for assignment')
  }

  /**
   * Finds Link by its unique linkId
   *
   *
   * @param {string} linkId
   * @return successfulServiceResponse<ILink> on success
   *         failureServiceResponse on failure
   */
  async findLinkById(linkId: string): Promise<IServiceResponse<ILink>> {
    return failureServiceResponse('Hidden for assignment')
  }

  /**
   * Finds links when given a list of linkIds.
   * Returns successfulServiceResponse with empty array when no links found.
   * @param {string[]} linkIds
   * @return successfulServiceResponse<ILink[]>
   */
  async findLinksById(linkIds: string[]): Promise<IServiceResponse<ILink[]>> {
    return failureServiceResponse('Hidden for assignment')
  }

  /**
   * Deletes link with the given linkId.
   * If link to delete was not found, return success.
   *
   * @param {string} linkId
   * @return successfulServiceResponse<ILink> on success
   *         failureServiceResponse on failure
   */
  async deleteLink(linkId: string): Promise<IServiceResponse<{}>> {
    return failureServiceResponse('Hidden for assignment')
  }

  async findLinksByAnchorId(anchorId: string): Promise<IServiceResponse<ILink[]>> {
    return failureServiceResponse('Hidden for assignment')
  }
}
