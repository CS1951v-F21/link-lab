import {
  IServiceResponse,
  failureServiceResponse,
  successfulServiceResponse,
  ILink,
  isILink,
} from '../types'
import { MongoClient } from 'mongodb'

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
   * Inserts a new link into the database
   * Returns successfulServiceResponse with ILink that was inserted as the payload
   *
   * TODO (Lab 2):
   * - Tip: Use NodeCollectionConnection.insertNode() as a close reference!
   * 1. Return failure response if link is not of type ILink
   *    - Tip: Check types/ILink.ts for useful helper function
   * 2. Insert link into collection via client
   * 3. Verify that the insertion was successful
   *    - Tip: Use NodeCollecitonConnection.insertNode() as a close reference
   * 4. Return successful response or failure response based on result of Step 3
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
   * TODO: (Lab 2):
   * - Tip: Use NodeCollectionConnection.findNodeById() as a close reference!
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

  /**
   * Deletes links when given a list of linkIds.
   * @param {string[]} linkIds
   * @return successfulServiceResponse<{}> on success
   *         failureServiceResponse on failure
   */
  async deleteLinks(linkIds: string[]): Promise<IServiceResponse<{}>> {
    return failureServiceResponse('Hidden for assignment')
  }

  async findLinksByAnchorId(anchorId: string): Promise<IServiceResponse<ILink[]>> {
    return failureServiceResponse('Hidden for assignment')
  }
}