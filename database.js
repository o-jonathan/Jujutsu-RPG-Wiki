/// Para usar você DEVE incluir
/// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
/// no HTML

const sbURL = 'https://brffbxweqoifznvxpgtc.supabase.co';
const sbKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyZmZieHdlcW9pZnpudnhwZ3RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5OTkxNzEsImV4cCI6MjA4MTU3NTE3MX0.kBjBK4M_Ei2Cqx-fEpKyZd7B1rMd3cuH65A6H0-HRIY';
const sb = window.supabase.createClient(sbURL, sbKEY);

/// READ
async function sbRead(table) {
    const {data, error} = await sb
    .from(table)
    .select('*');

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

/// WRITE
async function sbWrite(table, data) {
    const {error} = await sb
    .from(table)
    .insert(data);

    if (error) {
        console.error(error);
        return false;
    }

    return true;
}

/// DELETE
async function sbDelete(table, data) {
    const {error} = await sb
    .from(table)
    .delete()
    .eq('id', data.id);

    if (error) {
        console.error(error);
        return false;
    }

    return true;
}