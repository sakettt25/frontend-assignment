import { useState, useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import {
  toKey, todayKey, normaliseRange, getDaysInMonth, getFirstDOW,
} from '../utils/dateUtils';

export function useCalendarState(){

    //Navigation - Helps in the navigation/flipping between months and pages and years
    const now = new Date();
    const[year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth());
 
    const [flipDir,    setFlipDir]    = useState(null);
    const [isFlipping, setIsFlipping] = useState(false);

    const navigate = useCallback((dir) => {
        if (isFlipping) return;
        setFlipDir(dir);
        setIsFlipping(true);
    
        setTimeout(() => {
        setMonth((m) => {
            const next = m + (dir === 'next' ? 1 : -1);
            if (next > 11) { setYear((y) => y + 1); return 0; }
            if (next < 0)  { setYear((y) => y - 1); return 11; }
            return next;
        });
        setTimeout(() => { setIsFlipping(false); setFlipDir(null); }, 380);
        }, 340);
    }, [isFlipping]);
    
    const goNext = useCallback(() => navigate('next'), [navigate]);
    const goPrev = useCallback(() => navigate('prev'), [navigate]);

    // Date Range - Helps to set the date range and select date

    const [startKey, setStartKey] = useState(null);
    const [endKey,   setEndKey]   = useState(null);
    
    const selectDay = useCallback((key) => {
        if (!startKey || (startKey && endKey)) {
        setStartKey(key);
        setEndKey(null);
        return;
        }
        if (key === startKey) { setStartKey(null); return; }
        const { startKey: s, endKey: e } = normaliseRange(startKey, key);
        setStartKey(s);
        setEndKey(e);
    }, [startKey, endKey]);
    
    const clearRange = useCallback(() => { setStartKey(null); setEndKey(null); }, []);

    // Month Notes - State to manage the notes section and keep the notes

    const [monthNotesStore, setMonthNotesStore] = useLocalStorage('cal_month_notes', {});
    const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
    
    const makeDefaultNotes = () => [1,2,3,4,5].map((id) => ({ id, text: '', important: false, done: false }));
    
    const monthNotesList = monthNotesStore[monthKey] ?? makeDefaultNotes();
    
    const patchMonthNotes = useCallback((updater) => {
        setMonthNotesStore((prev) => {
        const current = prev[monthKey] ?? makeDefaultNotes();
        return { ...prev, [monthKey]: updater(current) };
        });
    }, [monthKey]); 
    
    const updateNote = useCallback((id, text) => patchMonthNotes((l) => l.map((n) => n.id === id ? { ...n, text }: n)), [patchMonthNotes]);

    const toggleImportant = useCallback((id)=> patchMonthNotes((l) => l.map((n) => n.id === id ? { ...n, important: !n.important } : n)), [patchMonthNotes]);

    const toggleDone = useCallback((id)=> patchMonthNotes((l) => l.map((n) => n.id === id ? { ...n, done: !n.done }: n)), [patchMonthNotes]);

    const addNote = useCallback(()=> patchMonthNotes((l) => [...l, { id: Date.now(), text: '', important: false, done: false }]), [patchMonthNotes]);
    
    const deleteNote = useCallback((id)=> patchMonthNotes((l) => l.filter((n) => n.id !== id)), [patchMonthNotes]);


    // Get the states for maintaining notes for each date

    const [dateNotesStore, setDateNotesStore] = useLocalStorage('cal_date_notes', {});
 
    const dateNoteKeys = useMemo(() => new Set(Object.keys(dateNotesStore).filter((k) => dateNotesStore[k]?.length > 0)),
        [dateNotesStore]
    );
    
    const getDateNotes = useCallback((k)=> dateNotesStore[k] ?? [], [dateNotesStore]);
    
    const addDateNote = useCallback((k) => setDateNotesStore((p) => ({ ...p, [k]: [...(p[k] ?? []), { id: Date.now(), text: '', important: false, done: false }] })),[setDateNotesStore]);


    const updateDateNote = useCallback((k, id, t) => setDateNotesStore((p) => ({ ...p, [k]: (p[k] ?? []).map((n) => n.id === id ? { ...n, text: t }: n) })), []);


    const toggleDateNoteImportant = useCallback((k, id) => setDateNotesStore((p) => ({ ...p, [k]: (p[k] ?? []).map((n) => n.id === id ? { ...n, important: !n.important } : n) })), []);


    const toggleDateNoteDone = useCallback((k, id)=> setDateNotesStore((p) => ({ ...p, [k]: (p[k] ?? []).map((n) => n.id === id ? { ...n, done: !n.done }: n) })), []);


    const deleteDateNote = useCallback((k, id) => setDateNotesStore((p) => ({ ...p, [k]: (p[k] ?? []).filter((n) => n.id !== id) })),[]);


    const setRange = useCallback((s, e) => {
        setStartKey(s);
        setEndKey(e);
    }, []);


    // Computing the days 

    const daysInMonth = getDaysInMonth(year, month);
    const firstDOW = getFirstDOW(year, month);
    const prevMonthLen = getDaysInMonth(year, month === 0 ? 11 : month - 1);
    
    return {
        navigation: { year, month, goNext, goPrev },
        range:      { startKey, endKey, selectDay, clearRange, setRange },
        monthNotes: { list: monthNotesList, updateNote, toggleImportant, toggleDone, addNote, deleteNote },
        dateNotes:  { getDateNotes, addDateNote, updateDateNote, toggleDateNoteImportant, toggleDateNoteDone, deleteDateNote, dateNoteKeys },
        computed:   { todayKey: todayKey(), daysInMonth, firstDOW, prevMonthLen },
        animation:  { flipDir, isFlipping },

    };

}

