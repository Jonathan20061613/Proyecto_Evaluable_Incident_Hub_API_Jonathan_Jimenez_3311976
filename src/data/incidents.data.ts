import { Incident } from "../models/incident.model";

export const incidents: Incident[] = [
    {
        id: 1,
        title: "Proyector sin señal",
        description: "El proyector no reconoce ningún computador conectado.",
        reporter: "Carlos Díaz",
        location: "Aula 201",
        priority: "MEDIUM",
        status: "OPEN",
        estimatedMinutes: 30,
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        title: "Falla de red en laboratorio",
        description: "Los equipos del costado norte perdieron acceso al switch principal.",
        reporter: "Maria Perez",
        location: "Laboratorio 102",
        priority: "HIGH",
        status: "IN_PROGRESS",
        estimatedMinutes: 45,
        createdAt: new Date().toISOString()
    },
    {
        id: 3,
        title: "Atasco de papel en impresora",
        description: "La impresora multifuncional se bloquea al imprimir en dúplex.",
        reporter: "Juan Ruiz",
        location: "Biblioteca",
        priority: "LOW",
        status: "RESOLVED",
        estimatedMinutes: 20,
        createdAt: new Date().toISOString()
    },
    {
        id: 4,
        title: "Servidor local sin acceso SSH",
        description: "El nodo de pruebas principal rechaza las conexiones remotas.",
        reporter: "Ana Gomez",
        location: "Sala de Servidores",
        priority: "CRITICAL",
        status: "OPEN",
        estimatedMinutes: 50,
        createdAt: new Date().toISOString()
    },
    {
        id: 5,
        title: "Teclado dañado en puesto de trabajo",
        description: "Varias teclas numéricas no responden al escribir.",
        reporter: "Luis Castro",
        location: "Oficina 305",
        priority: "LOW",
        status: "OPEN",
        estimatedMinutes: 15,
        createdAt: new Date().toISOString()
    }
];