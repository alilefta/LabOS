import { describe, expect, it } from 'vitest'
import { parseCaseClinicalCheckedSuffix, parseCaseObjectStorageCheckedSuffix } from
  '@/modules/labos-files/case-clinical-suffix'

describe('Case checked filename suffix', () => {
  it.each([
    ['photo.jpg', 'JPG'], ['photo.JPEG', 'JPEG'], ['photo.png', 'PNG'],
    ['photo.WEBP', 'WEBP'],
  ])('normalizes %s for object storage', (filename, expected) => {
    expect(parseCaseObjectStorageCheckedSuffix(filename)).toBe(expected)
  })
  it.each(['photo.gif', 'photo.png.exe', '.png', 'photo', null])(
    'denies unsupported or malformed %s', filename => {
      expect(parseCaseObjectStorageCheckedSuffix(filename)).toBeNull()
    })
  it('keeps the legacy callback JPEG only', () => {
    expect(parseCaseClinicalCheckedSuffix('photo.jpg')).toBe('JPG')
    expect(parseCaseClinicalCheckedSuffix('photo.png')).toBeNull()
  })
})
