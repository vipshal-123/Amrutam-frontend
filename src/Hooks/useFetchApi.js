import { useCallback, useEffect, useState, useRef } from 'react'

const useFetchApi = (apiFunction, options) => {
    const [items, setItems] = useState([])
    const [cursor, setCursor] = useState('')
    const [loading, setLoading] = useState(false)
    const optionsRef = useRef(options)

    useEffect(() => {
        optionsRef.current = options
    }, [options])

    const fetchData = useCallback(
        async (currentCursor = '') => {
            const currentOptions = optionsRef.current
            if (!currentOptions?.params && currentOptions?.requiresId) {
                return
            }

            setLoading(true)

            try {
                const response = await apiFunction({
                    params: currentOptions?.params || '',
                    limit: 10,
                    next: currentCursor || '',
                    type: currentOptions?.type || '',
                })

                if (response?.success) {
                    console.log('response: ', response?.next)
                    setItems((prev) => (currentCursor ? [...prev, ...response.data] : response.data))
                    setCursor(response?.next)
                } else {
                    setItems([])
                }
            } catch (error) {
                console.error('Error:', error)
                setItems([])
            } finally {
                setLoading(false)
            }
        },
        [apiFunction],
    )

    useEffect(() => {
        if (options?.requiresId && !options?.params) {
            return
        }
        fetchData()
    }, [options?.params, fetchData, options?.requiresId])

    const hasMore = !!cursor && items.length > 0

    return {
        items,
        fetchData,
        hasMore,
        cursor,
        setItems,
        loading,
    }
}

export default useFetchApi
