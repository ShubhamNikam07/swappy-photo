import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Category, PkgGroup } from './data'

interface UiState {
  menu: boolean; filter: Category | 'All'; lightbox: number | null; pkgGroup: PkgGroup
  theme: 'dark' | 'light'
}
const savedTheme = (): 'dark' | 'light' => {
  try { return localStorage.getItem('swappy-theme') === 'light' ? 'light' : 'dark' } catch { return 'dark' }
}
const ui = createSlice({
  name: 'ui',
  initialState: { menu: false, filter: 'All', lightbox: null, pkgGroup: 'Wedding', theme: savedTheme() } as UiState,
  reducers: {
    toggleMenu: (s, a: PayloadAction<boolean | undefined>) => { s.menu = a.payload ?? !s.menu },
    setFilter: (s, a: PayloadAction<UiState['filter']>) => { s.filter = a.payload },
    openLightbox: (s, a: PayloadAction<number | null>) => { s.lightbox = a.payload },
    setPkgGroup: (s, a: PayloadAction<PkgGroup>) => { s.pkgGroup = a.payload },
    toggleTheme: (s) => { s.theme = s.theme === 'dark' ? 'light' : 'dark' },
  },
})

export interface Enquiry { id: string; name: string; phone: string; date: string; packageId: string; message: string; at: string }
const KEY = 'swappy-enquiries'
const load = (): Enquiry[] => { try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] } }
const enquiries = createSlice({
  name: 'enquiries',
  initialState: { items: load(), selected: 'pw1' } as { items: Enquiry[]; selected: string },
  reducers: {
    addEnquiry: (s, a: PayloadAction<Omit<Enquiry, 'id' | 'at'>>) => {
      s.items.unshift({ ...a.payload, id: crypto.randomUUID(), at: new Date().toISOString() })
    },
    selectPackage: (s, a: PayloadAction<string>) => { s.selected = a.payload },
  },
})

export const { toggleMenu, setFilter, openLightbox, setPkgGroup, toggleTheme } = ui.actions
export const { addEnquiry, selectPackage } = enquiries.actions
export const store = configureStore({ reducer: { ui: ui.reducer, enquiries: enquiries.reducer } })
store.subscribe(() => {
  try { localStorage.setItem(KEY, JSON.stringify(store.getState().enquiries.items)) } catch { /* ignore */ }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
