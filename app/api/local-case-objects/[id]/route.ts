import { serveLocalCaseObject } from '@/modules/labos-files/object-storage/local-case'

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
	return serveLocalCaseObject(request, (await context.params).id)
}

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
	return serveLocalCaseObject(request, (await context.params).id)
}
