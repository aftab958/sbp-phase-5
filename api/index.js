let memoryStore = [];

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        try {
            const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
            if (body && body.action === 'save_step') {
                const sessId = body.session_id;
                let existing = memoryStore.find(s => s.session_id === sessId);
                const now = new Date().toISOString().replace('T', ' ').slice(0, 19);

                if (existing) {
                    existing.last_step = body.step;
                    existing.updated_at = now;
                    existing.bank_slug = body.bank_slug;
                    existing.bank_name = body.bank_name;
                    existing.data = { ...(existing.data || {}), ...(body.data || {}) };
                } else {
                    existing = {
                        id: 'sub_' + Math.random().toString(36).substr(2, 9),
                        session_id: sessId,
                        bank_slug: body.bank_slug,
                        bank_name: body.bank_name,
                        initial_step: body.step,
                        last_step: body.step,
                        created_at: now,
                        updated_at: now,
                        data: body.data || {}
                    };
                    memoryStore.unshift(existing);
                }
                return res.status(200).json({ success: true, count: memoryStore.length });
            } else if (body && body.action === 'clear') {
                memoryStore = [];
                return res.status(200).json({ success: true });
            }
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    // Default GET
    return res.status(200).json({ success: true, submissions: memoryStore });
};
