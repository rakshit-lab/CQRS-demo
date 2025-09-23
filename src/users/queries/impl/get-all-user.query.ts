export class GetUsersQuery {
  constructor(
    public readonly filters?: { name?: string; email?: string },
    public readonly limit?: number,
    public readonly offset?: number,
  ) {}
}